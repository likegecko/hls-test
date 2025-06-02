export default function Home() {
  return (
    <main className="flex flex-col items-center gap-8 pt-6">
      <section className="flex flex-col w-full">
        <h1 className="text-3xl">HTML Live Streaming 테스트</h1>
      </section>

      <section className="w-full">
        <video controls className="w-full"></video>
      </section>
    </main>
  );
}
