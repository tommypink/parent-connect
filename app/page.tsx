import Feed from '@/components/Feed';

export default function Home() {
  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ParentConnect</h1>
      <Feed />
    </div>
  );
}