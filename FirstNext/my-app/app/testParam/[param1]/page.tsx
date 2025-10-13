type Props = {
  params: Promise<{
    param1: string
  }>;
  searchParams: Promise<{
    param2: string
  }>;
}

export const getMetadata = async ({params, searchParams}: Props) => {
  const {param1} = await params;
  const {param2} = await searchParams;
  return {
    title: `Info ${param1} ${param2}`
  }
}

export default async function Home({params, searchParams}: Props) {
  const {param1} = await params;
  const {param2} = await searchParams;
  return (
  
    <>
    <div>Params: {param1}</div>
    
    <div>Search Params: {param2}</div>
    </>
  );
}
