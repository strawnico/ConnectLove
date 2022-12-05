import Image from "next/image";

const loader = ({ src }) => {
  return `${src}`;
};

export default function Post({ post }) {
  return (
    <div
      className="p-4 flex flex-col w-full border gap-2 border-b-0"
    >
      <div className="flex gap-2 items-center">
        {post.name == "João" ? (
          <Image
            width={42}
            className="rounded-full"
            height={42}
            loader={loader}
            unoptimized={true}
            alt={"Avatar"}
            src={
              "https://cdn.discordapp.com/attachments/826962247968096316/1049126964809707530/7a76e2af4dd9e5a5081315d5102d5304.png"
            }
          ></Image>
        ) : (
          <Image
            className="rounded-full"
            width={42}
            loader={loader}
            unoptimized={true}
            alt={"Avatar"}
            height={42}
            src={
              "https://cdn.discordapp.com/attachments/826962247968096316/1049127213976539196/cc8b47e894c99416664247f39c32294a.png"
            }
          ></Image>
        )}
        <div className="flex flex-col gap-0">
          <span className="font-bold font-plus text-gray-800">{post.name}</span>
          <span className="font-normal text-sm font-plus text-gray-400">
            {post.arroba}
          </span>
        </div>
        <span className="ml-auto mb-auto font-normal text-sm font-plus text-gray-400">
          {new Date(post.createdAt).toLocaleString([], {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      <span className="text-gray-900 font-plus font-regular">
        {post.message}
      </span>
    </div>
  );
}
