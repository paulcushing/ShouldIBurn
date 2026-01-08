import Link from "next/link";

export default function NotFound() {
    return (
        <div style={{ padding: 24 }}>
            <h1>404</h1>
            <p>Page not found.</p>
            <p>
                <Link href="/">Go back home</Link>
            </p>
        </div>
    );
}
