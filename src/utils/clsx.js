// You probably heard of clsx, i just didn't want to install it as a dependency
export default function clsx(...classes) {
  return classes.filter(Boolean).join(' ');
};