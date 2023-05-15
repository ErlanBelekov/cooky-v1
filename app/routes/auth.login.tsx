import { Form } from "@remix-run/react";

function LoginPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Form action="/auth/google" method="post">
        <button className="rounded-md bg-teal-600 px-4 py-2 text-center text-black">
          Login with Google
        </button>
      </Form>
    </div>
  );
}

export default LoginPage;
