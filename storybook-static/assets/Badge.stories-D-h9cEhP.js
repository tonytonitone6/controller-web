import{j as a,g as v,P as c,a as g}from"./palette-ChP6cASD.js";function o({label:e,color:r,size:m="sm"}){const d=r?v(r):void 0;console.log(m);const p=m==="md"?"px-5 py-1":"px-10 py-0.5",u=r?"text-gray-900":"bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200";return a.jsx("span",{style:d,className:`inline-flex items-center rounded-full font-medium ${p} ${u}`,children:e})}o.__docgenInfo={description:"",methods:[],displayName:"Badge",props:{label:{required:!0,tsType:{name:"string"},description:""},color:{required:!1,tsType:{name:"union",raw:`| 'primary-100'
| 'primary-200'
| 'primary-300'
| 'primary-400'
| 'primary-500'
| 'primary-600'
| 'primary-700'
| 'gray-100'
| 'gray-200'
| 'gray-300'
| 'gray-400'
| 'gray-500'
| 'gray-600'
| 'gray-700'
| 'gray-800'
| 'gray-900'
| 'status-red'
| 'status-yellow'
| 'status-green'
| 'viz-1'
| 'viz-2'
| 'viz-3'
| 'viz-4'
| 'viz-5'
| 'viz-6'
| 'viz-7'
| 'viz-8'
| 'viz-9'
| 'viz-10'
| 'viz-11'
| 'viz-12'
| 'viz-13'`,elements:[{name:"literal",value:"'primary-100'"},{name:"literal",value:"'primary-200'"},{name:"literal",value:"'primary-300'"},{name:"literal",value:"'primary-400'"},{name:"literal",value:"'primary-500'"},{name:"literal",value:"'primary-600'"},{name:"literal",value:"'primary-700'"},{name:"literal",value:"'gray-100'"},{name:"literal",value:"'gray-200'"},{name:"literal",value:"'gray-300'"},{name:"literal",value:"'gray-400'"},{name:"literal",value:"'gray-500'"},{name:"literal",value:"'gray-600'"},{name:"literal",value:"'gray-700'"},{name:"literal",value:"'gray-800'"},{name:"literal",value:"'gray-900'"},{name:"literal",value:"'status-red'"},{name:"literal",value:"'status-yellow'"},{name:"literal",value:"'status-green'"},{name:"literal",value:"'viz-1'"},{name:"literal",value:"'viz-2'"},{name:"literal",value:"'viz-3'"},{name:"literal",value:"'viz-4'"},{name:"literal",value:"'viz-5'"},{name:"literal",value:"'viz-6'"},{name:"literal",value:"'viz-7'"},{name:"literal",value:"'viz-8'"},{name:"literal",value:"'viz-9'"},{name:"literal",value:"'viz-10'"},{name:"literal",value:"'viz-11'"},{name:"literal",value:"'viz-12'"},{name:"literal",value:"'viz-13'"}]},description:""},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"}]},description:"",defaultValue:{value:"'sm'",computed:!1}}}};const y=[...c],x=Object.fromEntries(c.map(e=>[e,e])),f={title:"Example/Badge",component:o,tags:["autodocs"],argTypes:{size:{control:"radio",options:["sm","md"]},color:{control:"select",options:y,mapping:x}}},l={args:{label:"Badge"}},s={args:{label:"Small",size:"sm"}},n={args:{label:"primary-500",color:"primary-500"}},t={render:()=>a.jsx("div",{className:"flex flex-wrap gap-3 items-center",children:["sm","md"].map(e=>a.jsx(o,{label:e,color:"primary-500",size:e},e))})},i={render:()=>a.jsx("div",{className:"flex flex-col gap-8",children:g.map(e=>a.jsxs("div",{children:[a.jsx("p",{className:"mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100",children:e.label}),a.jsx("div",{className:"flex flex-wrap gap-4",children:e.colors.map(r=>a.jsxs("div",{className:"flex flex-col items-center gap-1.5",children:[a.jsx("div",{style:{backgroundColor:`var(--color-${r})`},className:"w-10 h-10 rounded-md border border-black/10"}),a.jsx("span",{className:"text-xs text-gray-600 dark:text-gray-400 font-mono text-center",children:r}),a.jsx(o,{label:r,color:r,size:"sm"})]},r))})]},e.label))})};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Badge'
  }
}`,...l.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Small',
    size: 'sm'
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'primary-500',
    color: 'primary-500'
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-3 items-center">
      {(['sm', 'md'] as const).map(size => <Badge key={size} label={size} color="primary-500" size={size} />)}
    </div>
}`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-8">
      {PALETTE_GROUPS.map(group => <div key={group.label}>
          <p className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">{group.label}</p>
          <div className="flex flex-wrap gap-4">
            {group.colors.map(color => <div key={color} className="flex flex-col items-center gap-1.5">
                <div style={{
            backgroundColor: \`var(--color-\${color})\`
          }} className="w-10 h-10 rounded-md border border-black/10" />
                <span className="text-xs text-gray-600 dark:text-gray-400 font-mono text-center">{color}</span>
                <Badge label={color} color={color} size="sm" />
              </div>)}
          </div>
        </div>)}
    </div>
}`,...i.parameters?.docs?.source}}};const b=["Default","Small","WithColor","Sizes","AllPaletteColors"];export{i as AllPaletteColors,l as Default,t as Sizes,s as Small,n as WithColor,b as __namedExportsOrder,f as default};
