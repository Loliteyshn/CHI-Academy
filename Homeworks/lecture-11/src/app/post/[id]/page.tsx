// app/exhibits/post/[id]/page.tsx

export default async function ExhibitPage({ params }: { params: { id: string } }) {
    const { id } = (await params);

    const response = await fetch(`https://playground.zenberry.one/api/exhibits/post/${id}`, {
        cache: 'no-store',
    });

    if (!response.ok) {
        return <div>Error loading post</div>;
    }

    const data = await response.json();

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>{data.user.username}</h1>

            <p style={{ opacity: 0.7 }}>{data.createdAt}</p>

            <img
                src={data.imageUrl}
                alt="post"
                style={{
                    width: '100%',
                    borderRadius: '12px',
                    marginTop: '20px',
                    objectFit: 'cover'
                }}
            />

            <p style={{ marginTop: '20px', fontSize: '18px' }}>
                {data.description}
            </p>
        </div>
    );
}
