# Local Storage Exercise

Hello, future software developer! In this exercise, you will practice local storage on top of the previous events exercise. `🤩`

In this exercise:

- The boxes from the events exercise become notes, and the only difference in terms of features is the user should be able to update a note.
- The notes, color, and ID counter should be saved to local storage and read from the local storage when the page opens.
- If a note gets deleted, it should also be removed from the local storage.
- If a note gets updated, it should also be reflected in the local storage.

### Starter Code

[Starter Code.zip](https://prod-files-secure.s3.us-west-2.amazonaws.com/163f1722-85e9-4a3c-adba-457a91094f00/052ab85a-c380-4606-99ed-e70f5dbbee1f/Starter_Code_2.zip)

In the starter code, we left TODOs for you. Those are the places where you will implement the above tasks. You can either continue from your code or use our starter code, which is also using the solution of the events exercise. However, we made some changes in keeping with the nature of this exercise.

- We renamed (pay attention to the case):
  - `boxes` to `notes`
  - `box` to `note` except `box-sizing: border-box;`
  - `Box` to `Note`
- In the `addNewNote` function, `document.createElement` related changes:
  - Instead of creating a `div` in the add new note function, we create a `textarea`.
  - Instead of setting the `textContent`, we set `value`.
- We removed the `mouseover` and `mouseout` event listeners.
- In the `keydown` event listener, we added `event.target.type === "textarea"` as a condition to ignore on top of `event.target.id === "color-input"`. This prevents us from accidentally creating a new note while the user is editing a note if the user presses the `N` key.
- We added the `blur` event listener to the `noteContainer` element with a true option since there is a difference in this event's event propagation. (The reason is that most events bubble from the target element up through the ancestors in the DOM tree. The `blur` event, however, does not bubble, so to catch it at a higher level, we need to set the listener in the capturing phase by setting the third argument of `addEventListener` to `true`.)

Happy coding!
