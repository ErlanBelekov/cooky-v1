type AvatarProps = {
  src: string;
};

export function Avatar(props: AvatarProps) {
  return <img className="h-8 w-8 rounded-full" src={props.src} alt="avatar" />;
}
