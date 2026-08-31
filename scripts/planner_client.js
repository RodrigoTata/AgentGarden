/**
 * Planner Client para Agentes IA
 * Utiliza Azure CLI para obtener el token de Microsoft Graph y manipular el Kanban de Planner.
 */
const { execSync } = require('child_process');

const PLAN_ID = '-vYIu-jGNkyxOE3lqf4ppGQAFTzw';
const AZ_PATH = 'C:\\Program Files\\Microsoft SDKs\\Azure\\CLI2\\wbin\\az.cmd';

function getAccessToken() {
  const output = execSync(`"${AZ_PATH}" account get-access-token --resource-type ms-graph`, { encoding: 'utf8' });
  return JSON.parse(output).accessToken;
}

async function graphRequest(endpoint, method = 'GET', body = null, extraHeaders = {}) {
  const token = getAccessToken();
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...extraHeaders
  };
  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`https://graph.microsoft.com/v1.0${endpoint}`, options);
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Graph API error ${res.status} ${res.statusText}: ${errText}`);
  }
  if (res.status === 204) return null;
  return await res.json();
}

async function listBoard() {
  const [plan, bucketsData, tasksData] = await Promise.all([
    graphRequest(`/planner/plans/${PLAN_ID}`),
    graphRequest(`/planner/plans/${PLAN_ID}/buckets`),
    graphRequest(`/planner/plans/${PLAN_ID}/tasks`)
  ]);

  const buckets = bucketsData.value;
  const tasks = tasksData.value;

  console.log(`\n======================================================`);
  console.log(`📊 TABLERO: ${plan.title}`);
  console.log(`======================================================\n`);

  buckets.forEach(b => {
    const bucketTasks = tasks.filter(t => t.bucketId === b.id);
    console.log(`📂 [ ${b.name} ] (${bucketTasks.length} tareas) - ID: ${b.id}`);
    if (bucketTasks.length === 0) {
      console.log(`   (vacío)`);
    } else {
      bucketTasks.forEach(t => {
        const checkCount = t.checklistItemCount || 0;
        const activeCheck = t.activeChecklistItemCount || 0;
        const progress = `${t.percentComplete}%`;
        console.log(`   • [${progress.padStart(4)}] ${t.title} (ID: ${t.id})`);
        if (checkCount > 0) {
          console.log(`            Checklist: ${checkCount - activeCheck}/${checkCount} completados`);
        }
      });
    }
    console.log('');
  });
}

async function getTaskDetails(taskId) {
  const task = await graphRequest(`/planner/tasks/${taskId}`);
  const details = await graphRequest(`/planner/tasks/${taskId}/details`);
  return { task, details };
}

async function updateTask(taskId, updates) {
  // Planner requires If-Match header with @odata.etag
  const currentTask = await graphRequest(`/planner/tasks/${taskId}`);
  const etag = currentTask['@odata.etag'];

  const updated = await graphRequest(`/planner/tasks/${taskId}`, 'PATCH', updates, {
    'If-Match': etag
  });
  console.log(`✅ Tarea ${taskId} actualizada con éxito.`);
  return updated;
}

async function createTask(title, bucketNameOrId, percentComplete = 0) {
  const bucketsData = await graphRequest(`/planner/plans/${PLAN_ID}/buckets`);
  const buckets = bucketsData.value;
  let targetBucket = buckets.find(b => b.id === bucketNameOrId || b.name.toLowerCase() === bucketNameOrId.toLowerCase());
  if (!targetBucket) targetBucket = buckets[0];

  const newTask = await graphRequest(`/planner/tasks`, 'POST', {
    planId: PLAN_ID,
    bucketId: targetBucket.id,
    title,
    percentComplete
  });
  console.log(`✅ Tarea creada: "${title}" en bucket [${targetBucket.name}] (ID: ${newTask.id})`);
  return newTask;
}

// CLI handler
async function main() {
  const args = process.argv.slice(2);
  const cmd = args[0] || 'list';

  try {
    if (cmd === 'list') {
      await listBoard();
    } else if (cmd === 'create') {
      const title = args[1];
      const bucket = args[2] || 'Pendiente';
      if (!title) throw new Error('Uso: node planner_client.js create "Título" [Bucket]');
      await createTask(title, bucket);
    } else if (cmd === 'details') {
      const taskId = args[1];
      if (!taskId) throw new Error('Uso: node planner_client.js details <taskId>');
      const res = await getTaskDetails(taskId);
      console.log(JSON.stringify(res, null, 2));
    } else {
      console.log('Comandos disponibles: list, create, details');
    }
  } catch (err) {
    console.error('❌ Error en Planner Client:', err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { listBoard, getTaskDetails, updateTask, createTask, PLAN_ID };
