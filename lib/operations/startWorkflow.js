import {
  stringInput,
  autocompleteInput
} from '../prompts.js'

export default async() => {
  for (const cmdName of cfg.new_workflow_pre_commands) {
    const cmd = cfg.commands[cmdName]
    await spinner(chalk.cyan(cmdName), () => $([cmd]))
  }

  const { branchType } = await autocompleteInput('branchType', cfg.branch_types)
  const { taskId } = await stringInput('taskId')
  const { description } = await stringInput('description')
  const normalizedDescription = description.trim().replaceAll(' ', '_')
  const branchName = `${branchType}/${taskId}-${normalizedDescription}`

  log.cyan('checking out new branch:')
  log.yellowBox(branchName)

  await $`git checkout -b ${branchName}`
    .pipe(process.stdout)
}