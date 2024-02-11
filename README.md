###### Here will be not some official kind of documentation, but description of what I thought about developing this test task

First I thought about components that I need to create.

## Components

### Match

Here, I store information about a single match. The first button allows updating the match by adding scores for both teams (home and away), second one - finishing match (deletion).

### Scoreboard

The Scoreboard component shows all current matches and form to add new one.

### Summary

Here I will get summary of all current matches.
Order - from highest total score of both teams to lowest.
If 2 or more games have same total score - order by date: from newest to oldest.

## Data storage

For this task, I've chosen to use context. While prop drilling could suffice for the current simplicity, using context prepares for potential future expansions (obviously there will be no expansion on a test task, but cmon).

## Tests

Thoughts on tests for each component (since we are TDDing):

### Match

1. **Render:** Check if the component is rendered properly.
2. **Update Match:** Check if the match updates correctly.
3. **Finish Match:** Check if the match finishes correctly.

### Scoreboard

1. **Render:** Check if the component is rendered properly.
2. **Add New Match:** Check if adding a new match updates the component correctly.

### Summary

1. **Render:** Check if the component is rendered properly.
2. **Number of Games:** Check if the correct number of games is rendered.
3. **Order by Total Score:** Check the order when total scores are different.
4. **Order with Same Total Score:** Check the order when total scores are the same.

## Getting Started

With this initial plan, I am well-equipped to begin the development process by focusing on writing tests for each component.
