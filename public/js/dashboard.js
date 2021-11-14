
function displayNewPostForm() {
  document.querySelector('#new-post-form').style.display = 'block';
  document.querySelector('#displayNewPostFormButton').style.display = 'none';
}

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