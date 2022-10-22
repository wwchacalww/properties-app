type MessageProp = {
  type: string;
  msg: string;
};
export function Message({ type, msg }: MessageProp) {
  if (type === "error") {
    return (
      <div className="border py-3 px-6 rounded-lg bg-red-700">
        <span>{msg}</span>
      </div>
    );
  } else {
    return (
      <div className="border py-3 px-6 rounded-lg bg-green-700">
        <span>{msg}</span>
      </div>
    );
  }
}
