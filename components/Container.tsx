import classNames from 'classnames';

export interface Props extends React.ComponentProps<'div'> {}

export default function Container (props: Props) {
  return (
    <div
      {...props}
      className={classNames('component-container', props.className)}
    />
  );
}
