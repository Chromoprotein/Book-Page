export default function ErrorPage({error}) {
    const errorMessage = error ? error : "Whatever you were looking for is not here. Unless you were looking for this error page, in which case, congrats! You found it.";

    return (
        <>
            <h1>Error</h1>
            <p>{errorMessage}</p>
        </>
    );
}