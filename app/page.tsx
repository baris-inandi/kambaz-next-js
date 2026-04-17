import Link from "next/link";

export default function Home() {
  return (
    <main className="min-vh-100 bg-light text-dark">
      <section className="container py-4 py-md-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="rounded-4 border bg-white shadow-sm p-4 p-md-5">
              <div className="text-uppercase text-danger fw-semibold small mb-2">
                CS4550 Final Project
              </div>
              <h1 className="fw-bold mb-4" style={{ fontSize: "3rem" }}>
                Kambaz Quizzes
              </h1>
              <div className="d-flex flex-wrap gap-3">
                <Link
                  href="/account/signin"
                  className="btn btn-danger px-4 py-2"
                >
                  Open Kambaz
                </Link>
                <Link
                  href="/project-info"
                  className="btn btn-outline-dark px-4 py-2"
                >
                  Project Info
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
