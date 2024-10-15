import PlaydateList from '@/components/PlaydateList';

export default function PlaydatePage() {
  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Playdates</h1>
      <PlaydateList />
    </div>
  );
}