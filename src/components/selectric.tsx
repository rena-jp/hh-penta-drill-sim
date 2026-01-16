import { type VNode } from 'preact';

export function Selectric({
  id,
  label,
  selected,
  children,
}: {
  id: string;
  label: string | undefined;
  selected: string;
  children: (VNode | VNode[])[];
}) {
  return (
    <div className="form-control">
      <div className="select-group">
        <label className="head-group" htmlFor={id}>
          {label}
        </label>
        <select id={id} name={id} {...{ icon: 'down-arrow' }}>
          {children
            .flatMap((e) => e)
            .map((vNode) => (
              <option
                key={String(vNode.key)}
                value={String(vNode.key)}
                selected={String(vNode.key) === selected}
              >
                {vNode}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}
