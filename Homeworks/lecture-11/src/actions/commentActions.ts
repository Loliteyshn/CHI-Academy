import { CommentsResponseType } from "@/interfaces/Exhibit";

export const fetchComments = async (exhibitId: number) => {
    try {
        const response = await fetch(`/api/comments/${exhibitId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        return data as CommentsResponseType[];
    } catch (err) {
        if (err instanceof Error) {
            console.log(`Error occur: ${err.message}`);
        }
    }
}

export const addComment = async (exhibitId: number, comment: string) => {
    try {
        const response = await fetch(`/api/comments/${exhibitId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: comment }),
        });
        if (!response.ok) {
            throw new Error('Failed to add comment');
        }
        const data = await response.json();
        return data;
    } catch (err) {
        if (err instanceof Error) {
            console.log(`Error occur: ${err.message}`);
        }
    }
}

export const deleteComment = async (exhibitId: number, commentId: number) => {
    try {
        const response = await fetch(`/api/comments/${exhibitId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ commentId }),
        });
        if (!response.ok) {
            throw new Error('Failed to delete comment');
        }
        const data = await response.json();
        return data;
    } catch (err) {
        if (err instanceof Error) {
            console.log(`Error occur: ${err.message}`);
        }
    }
}