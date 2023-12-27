import Link from "next/link";
import Image from "next/image";
import { CardHeader, CardContent, CardFooter, Card } from "../ui/Card";
import { AvatarImage, AvatarFallback, Avatar } from "../ui/Avatar";

export function Timeline() {
  //list posts

  return (
    <main className="p-6 bg-gray-100">
      <div className="max-w-2xl mx-auto">
        <Card className="rounded-lg shadow-md mb-6">
          <CardHeader className="p-4 flex flex-row items-center">
            <Link
              className="flex items-center gap-2 text-sm font-semibold"
              href="#"
            >
              <Avatar className="w-8 h-8 border">
                <AvatarImage alt="@johndoe" src="/placeholder-avatar.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              John Doe
            </Link>
          </CardHeader>
          <CardContent className="p-4">
            <p className="mb-4">Just posted a new photo from my recent trip!</p>
            <Image
              alt="post image"
              className="w-full h-64 object-cover rounded-lg"
              height="200"
              src="https://plus.unsplash.com/premium_photo-1703385178754-f16e0a332e4a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              style={{
                aspectRatio: "400/200",
                objectFit: "cover",
              }}
              width="400"
            />
          </CardContent>
          <CardFooter className="p-4 flex justify-between items-center">
            <div className="flex items-center">
              <HeartIcon className="w-4 h-4 mr-2" />
              <span>120 likes</span>
            </div>
            <div className="flex items-center">
              <RepeatIcon className="w-4 h-4 mr-2" />
              <span>30 retweets</span>
            </div>
          </CardFooter>
        </Card>
        <Card className="rounded-lg shadow-md mb-6">
          <CardHeader className="p-4 flex flex-row items-center">
            <Link
              className="flex items-center gap-2 text-sm font-semibold"
              href="#"
            >
              <Avatar className="w-8 h-8 border">
                <AvatarImage alt="@janedoe" src="/placeholder-avatar.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              Jane Doe
            </Link>
          </CardHeader>
          <CardContent className="p-4">
            <p className="mb-4">Enjoying a beautiful sunset at the beach 🌅</p>
            <Image
              alt="post image"
              className="w-full h-64 object-cover rounded-lg"
              height="200"
              src="/placeholder.svg"
              width="400"
            />
          </CardContent>
          <CardFooter className="p-4 flex justify-between items-center">
            <div className="flex items-center">
              <HeartIcon className="w-4 h-4 mr-2" />
              <span>80 likes</span>
            </div>
            <div className="flex items-center">
              <RepeatIcon className="w-4 h-4 mr-2" />
              <span>20 retweets</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

function HeartIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function RepeatIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </svg>
  );
}
