'use client'
import { useRouter } from 'next/navigation';

export default function InfoLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const router = useRouter();
    return (
      <>
      <div className="mainContainer">
        <div className="LeftSidebar"><ul>
            <li onClick={() => router.push('/info/info1')}>Info 1</li>
            <li onClick={() => router.push('/info/info2')}>Info 2</li>
            <li onClick={() => router.push('/info/info3')}>Info 3</li>
            </ul></div>
        <div className="Content">{children}</div>
      </div>
      </>
    );
  }
  