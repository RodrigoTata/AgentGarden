---
name: execute
description: Execute a PRD or plan end-to-end autonomously. Runs to-tickets, tdd, and to-qa in sequence without human intervention.
disable-model-invocation: true
---

# Execute

Drive an implementation plan or PRD to completion autonomously. This is a **relentless** workflow: it forces underlying skills to skip their human-review gates and runs end-to-end until the final QA phase.

## Process

### 1. Breakdown (`to-tickets`)

Read the provided plan, PRD, or specification and apply the `to-tickets` skill to break it into tracer-bullet vertical slices.
**Override**: Skip the "Quiz the user" step. Draft the slices and immediately publish them to the configured tracker (or local files).
*Completion criterion*: Every ticket is published to the tracker and has its blocking edges defined.

### 2. Implementation (`tdd`)

Work the ticket frontier. For every ticket whose blockers are resolved, apply the `tdd` skill (red → green loop).
**Override**: Do not ask for human feedback between tickets. When a ticket is green and verified, immediately pick up the next ready ticket. If ambiguity arises, make the best technical decision, document it, and keep moving.
*Completion criterion*: Every ticket in the breakdown is implemented, and the test suite remains green.

### 3. Verification (`to-qa`)

Once the board is clear and all implementations are finished, apply the `to-qa` skill.
Run the automated QA checks and prepare the human testing plan. 
*Completion criterion*: The `qa_agent_report.md` and `qa_human_plan.md` artifacts are generated, and you explicitly stop to present the final outcome to the user for human review.

### 4. Logging (`execute-log`)

Before presenting the final outcome to the user for human review, you **MUST** log the execution details.
Append a new entry to the log file located at `c:\dev\AgentGarden\Logs\execute-log.md`. If the directory or file does not exist, create it.
The log entry must include:
- Date and time
- Project reference (the workspace/repository you were working on)
- Complexity (a brief assessment of the implementation complexity)
- Execution time (approximate duration of the `/execute` process)
- Tokens spent (approximate input and output tokens used during the execution)

You can use the PowerShell `Add-Content` command or similar to append to the file efficiently.
