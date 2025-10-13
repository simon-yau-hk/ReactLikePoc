import {Metadata} from 'next'

type Props = {
  params:Promise<{
    infoId: string
  }>;
}

export const getMetadata = async ({params}: Props) => {
  const {infoId} = await params;
  return {
    title: `Info ${infoId}`
  }
}

export default async function Home({params}: Props) {
  const {infoId} = await params;
  console.log(infoId);
  return (
  
    <div>Info {infoId}</div>
  );
}
