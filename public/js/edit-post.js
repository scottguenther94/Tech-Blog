const editPostHandler = async (event) => {
    event.preventDefault();
    console.log('editPostHandler fired');

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const title = document.querySelector('#post-title').value.trim();
    const post_text = document.querySelector('#post-text').value.trim();

    if (title && post_text) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, post_text }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to edit post');
        }
    }
};

const deletePostHandler = async (event) => {
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete post');
    }
};

document
    .querySelector('#updatePostButton')
    .addEventListener('click', editPostHandler);

document
    .querySelector('#deletePostButton')
    .addEventListener('click', deletePostHandler);