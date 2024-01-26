import SignIn from "@/components/auth/SignIn";
import { getAuthSession } from "@/lib/auth/utils";
import { MousePointerClickIcon } from "lucide-react";

export default async function Home() {
  const session = await getAuthSession();
  return (
    <main
      className={` ${session ? "" : "flex items-center justify-center h-full"}`}
    >
      <div
        className={` ${
          session
            ? "flex flex-col space-y-10"
            : "flex flex-col items-center justify-center space-y-3"
        }`}
      >
        {session ? (
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-4">
              <div className="flex">
                <div className="flex relative items-center justify-center space-x-1 bg-gradient-to-r group from-black to-primary bg-clip-text text-transparent">
                  <h2 className={`font-black  text-4xl`}>About</h2>
                  <img src="/whoami.svg" alt="whoami" className="w-10 h-10" />
                </div>
              </div>
              <div className="flex flex-col space-y-4 w-full bg-white text-black p-4 rounded-lg border border-primary">
                <h2>Welcome to LinkBee!</h2>

                <p>
                  LinkBee is your ultimate destination for creating personalized
                  pages with multiple links that you can easily share with
                  others. Whether you&apos;re a content creator, small business
                  owner, or just someone who loves to share cool stuff, LinkBee
                  makes it simple to organize and showcase your links in one
                  convenient place.
                </p>

                <p>With LinkBee, you can:</p>

                <div>
                  <b>Create Multiple Pages:</b> Build separate pages for
                  different purposes or audiences. Keep your personal links
                  separate from your business links, or create pages for
                  specific topics.
                </div>

                <div>
                  <b>Add Unlimited Links:</b> Add as many links as you want to
                  each page. Share your favorite articles, videos, products,
                  social media profiles, and more with your audience.
                </div>

                <div>
                  <b>Share Publicly:</b> Easily share your LinkBee pages with
                  anyone, anywhere. Whether you&apos;re promoting your page on
                  social media, including it in your email signature, or sharing
                  it with friends and followers, LinkBee makes it simple to get
                  your links out there.
                </div>

                <div>
                  Ready to get started? Sign up for LinkBee today and start
                  organizing your links like never before!
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-2 text-black bg-yellow-200 border border-primary rounded-full px-4 justify-center w-60 py-1 cursor-default shine">
              <h1 className="text-base font-normal">Linkbee is live</h1>
              <div className="flex items-center justify-center w-4 h-4">
                <MousePointerClickIcon />
              </div>
            </div>
            <div className="flex flex-col space-y-5">
              <h1 className="lg:text-8xl text-center whitespace-nowrap md:text-7xl sm:text-6xl text-5xl font-bold text-primary">
                LinkBee
              </h1>
              <p className="text-center text-lg font-medium text-muted-foreground max-w-xl">
                Your go-to platform for effortlessly sharing multiple links in
                one centralized location.
              </p>
            </div>
          </>
        )}
        <SignIn />
      </div>
    </main>
  );
}
