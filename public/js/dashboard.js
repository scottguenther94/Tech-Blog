// function to display new post form if the display new post form button is clicked
function displayNewPostForm() {
  document.querySelector('#new-post-form').style.display = 'block';
  document.querySelector('#displayNewPostFormButton').style.display = 'none';
}

// creates a new post if user enters a title, post text, and clicks the submit button
const newPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const post_text = document.querySelector('#post-text').value.trim();

  if (title && post_text) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, post_text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newPostHandler);