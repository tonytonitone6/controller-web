import{j as a,g,P as u,a as y}from"./palette-ChP6cASD.js";function o({label:e,variant:r="light",color:s,className:m="",onClick:p}){const v=s?g(s):void 0,c=/text-[\w-]+/.test(m),d=s?c?"":"text-white":r==="dark"?"bg-gray-800 text-white":"bg-gray-200 text-black";return a.jsx("button",{type:"button",style:v,className:`px-4 py-2 rounded transition-colors duration-300 ${d} ${m}`.trim(),onClick:p,children:e})}o.__docgenInfo={description:"",methods:[],displayName:"Button",props:{label:{required:!0,tsType:{name:"string"},description:""},variant:{required:!1,tsType:{name:"union",raw:"'light' | 'dark'",elements:[{name:"literal",value:"'light'"},{name:"literal",value:"'dark'"}]},description:"",defaultValue:{value:"'light'",computed:!1}},color:{required:!1,tsType:{name:"union",raw:`| 'primary-100'
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
| 'viz-13'`,elements:[{name:"literal",value:"'primary-100'"},{name:"literal",value:"'primary-200'"},{name:"literal",value:"'primary-300'"},{name:"literal",value:"'primary-400'"},{name:"literal",value:"'primary-500'"},{name:"literal",value:"'primary-600'"},{name:"literal",value:"'primary-700'"},{name:"literal",value:"'gray-100'"},{name:"literal",value:"'gray-200'"},{name:"literal",value:"'gray-300'"},{name:"literal",value:"'gray-400'"},{name:"literal",value:"'gray-500'"},{name:"literal",value:"'gray-600'"},{name:"literal",value:"'gray-700'"},{name:"literal",value:"'gray-800'"},{name:"literal",value:"'gray-900'"},{name:"literal",value:"'status-red'"},{name:"literal",value:"'status-yellow'"},{name:"literal",value:"'status-green'"},{name:"literal",value:"'viz-1'"},{name:"literal",value:"'viz-2'"},{name:"literal",value:"'viz-3'"},{name:"literal",value:"'viz-4'"},{name:"literal",value:"'viz-5'"},{name:"literal",value:"'viz-6'"},{name:"literal",value:"'viz-7'"},{name:"literal",value:"'viz-8'"},{name:"literal",value:"'viz-9'"},{name:"literal",value:"'viz-10'"},{name:"literal",value:"'viz-11'"},{name:"literal",value:"'viz-12'"},{name:"literal",value:"'viz-13'"}]},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const x=[...u],z={...Object.fromEntries(u.map(e=>[e,e]))},f={title:"Example/Button",component:o,tags:["autodocs"],argTypes:{color:{control:"select",options:x,mapping:z}}},l={args:{label:"Light mode",variant:"light"}},t={args:{label:"Dark mode",variant:"dark"}},n={args:{label:"Palette Color",color:"gray-100"}},i={render:()=>a.jsx("div",{className:"flex flex-col gap-6",children:y.map(e=>a.jsxs("div",{children:[a.jsx("p",{className:"mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400",children:e.label}),a.jsx("div",{className:"flex flex-wrap gap-2",children:e.colors.map(r=>a.jsx(o,{label:r,color:r},r))})]},e.label))})};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Light mode',
    variant: 'light'
  }
}`,...l.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Dark mode',
    variant: 'dark'
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Palette Color',
    color: "gray-100"
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-6">
      {PALETTE_GROUPS.map(group => <div key={group.label}>
          <p className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">{group.label}</p>
          <div className="flex flex-wrap gap-2">
            {group.colors.map(color => <Button key={color} label={color} color={color} />)}
          </div>
        </div>)}
    </div>
}`,...i.parameters?.docs?.source}}};const h=["Light","Dark","PaletteColor","AllPaletteColors"];export{i as AllPaletteColors,t as Dark,l as Light,n as PaletteColor,h as __namedExportsOrder,f as default};
