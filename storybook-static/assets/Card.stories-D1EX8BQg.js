import{j as e,P as o,a as c}from"./palette-ChP6cASD.js";function n({title:a,description:r,accentColor:s}){return e.jsxs("div",{className:"rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden",children:[s&&e.jsx("div",{style:{backgroundColor:`var(--color-${s})`},className:"h-2 w-full"}),e.jsxs("div",{className:"p-4",children:[e.jsx("h3",{className:"font-semibold text-gray-900 dark:text-gray-100",children:a}),r&&e.jsx("p",{className:"mt-1 text-sm text-gray-500 dark:text-gray-400",children:r})]})]})}n.__docgenInfo={description:"",methods:[],displayName:"Card",props:{title:{required:!0,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"string"},description:""},accentColor:{required:!1,tsType:{name:"union",raw:`| 'primary-100'
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
| 'viz-13'`,elements:[{name:"literal",value:"'primary-100'"},{name:"literal",value:"'primary-200'"},{name:"literal",value:"'primary-300'"},{name:"literal",value:"'primary-400'"},{name:"literal",value:"'primary-500'"},{name:"literal",value:"'primary-600'"},{name:"literal",value:"'primary-700'"},{name:"literal",value:"'gray-100'"},{name:"literal",value:"'gray-200'"},{name:"literal",value:"'gray-300'"},{name:"literal",value:"'gray-400'"},{name:"literal",value:"'gray-500'"},{name:"literal",value:"'gray-600'"},{name:"literal",value:"'gray-700'"},{name:"literal",value:"'gray-800'"},{name:"literal",value:"'gray-900'"},{name:"literal",value:"'status-red'"},{name:"literal",value:"'status-yellow'"},{name:"literal",value:"'status-green'"},{name:"literal",value:"'viz-1'"},{name:"literal",value:"'viz-2'"},{name:"literal",value:"'viz-3'"},{name:"literal",value:"'viz-4'"},{name:"literal",value:"'viz-5'"},{name:"literal",value:"'viz-6'"},{name:"literal",value:"'viz-7'"},{name:"literal",value:"'viz-8'"},{name:"literal",value:"'viz-9'"},{name:"literal",value:"'viz-10'"},{name:"literal",value:"'viz-11'"},{name:"literal",value:"'viz-12'"},{name:"literal",value:"'viz-13'"}]},description:""}}};const m=[...o],d=Object.fromEntries(o.map(a=>[a,a])),v={title:"Example/Card",component:n,tags:["autodocs"],argTypes:{accentColor:{control:"select",options:m,mapping:d}}},l={args:{title:"Card Title",description:"This is a description for the card component."}},t={args:{title:"Accented Card",description:"This card has a colored top strip accent.",accentColor:"primary-500"}},i={render:()=>e.jsx("div",{className:"flex flex-col gap-8",children:c.map(a=>e.jsxs("div",{children:[e.jsx("p",{className:"mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100",children:a.label}),e.jsx("div",{className:"grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4",children:a.colors.map(r=>e.jsx(n,{title:r,description:"Palette accent color",accentColor:r},r))})]},a.label))})};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Card Title',
    description: 'This is a description for the card component.'
  }
}`,...l.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Accented Card',
    description: 'This card has a colored top strip accent.',
    accentColor: 'primary-500'
  }
}`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-8">
      {PALETTE_GROUPS.map(group => <div key={group.label}>
          <p className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">{group.label}</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {group.colors.map(color => <Card key={color} title={color} description="Palette accent color" accentColor={color} />)}
          </div>
        </div>)}
    </div>
}`,...i.parameters?.docs?.source}}};const u=["Default","WithAccent","AllPaletteColors"];export{i as AllPaletteColors,l as Default,t as WithAccent,u as __namedExportsOrder,v as default};
