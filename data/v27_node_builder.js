// Economy Master Interface v2.7 — local Tree node builder + datagrid proposal
// This file deliberately leaves the external sector TreeViews unchanged.
(function(){
function selectedParentForNewNode(){const n=selectedNode();return n?n.id:currentRoot().id;}
function currentNodeContextText(){return selectedPath().map(n=>n.label).join(' > ') || app.activeSector;}
function cleanFieldName(x){return String(x||'').trim().toUpperCase().replace(/[^A-Z0-9]+/g,'_').replace(/^_|_$/g,'');}
function parseFieldHints(txt){return uniqueColumns(String(txt||'').split(/[\n,;]+/).map(cleanFieldName).filter(Boolean));}
function inferFieldType(c){
  if(/DATE|DEADLINE|EXPIRY|EFFECTIVE|FRESHNESS|POSTED|CLOSES/.test(c))return 'date';
  if(/PRICE|AMOUNT|COST|VALUE|FEE|RATE|PREMIUM|DEDUCTIBLE|LIMIT|PAYMENT|PRINCIPAL/.test(c))return 'currency_or_number';
  if(/SCORE|RISK|PRIORITY|STATUS|QUALITY|TRUST|CERTIFICATION/.test(c))return 'enum';
  if(/ID|REF|VIN|NUMBER/.test(c))return 'id/reference';
  if(/NOTES|DESCRIPTION|TERMS|SUMMARY/.test(c))return 'long_text';
  return 'text';
}
function inferNodeKind(label, meaning, sector, forced){
  if(forced && forced!=='auto')return forced;
  const t=(label+' '+meaning+' '+sector+' '+currentNodeContextText()).toLowerCase();
  if(/shopping|grocery list|repeat order|profile|requirement|need/.test(t))return 'shopping_list';
  if(/farm|store|source|supplier|provider|iga|market|producer|heifer/.test(t))return 'source_provider';
  if(/delivery|deliver|courier|pickup|fulfillment|service/.test(t))return 'delivery_service';
  if(/offer|listing|sale|for sale|rent|available/.test(t))return 'offer_listing';
  if(sector==='Human / Consumer' && /food|grocery|clothing|shelter|transport|consumer|medical/.test(t))return 'consumer_need_fulfillment';
  if(sector==='Public / Government' && /registry|title|record|registration|filing|certificate|parcel|land/.test(t))return 'public_registry';
  if(sector==='Public / Government' && /permit|licence|license|inspection|renewal/.test(t))return 'public_permission';
  if(sector==='Public / Government' && /service|case|application|request|complaint|appeal/.test(t))return 'public_service_case';
  if(sector==='Business / Commercial')return 'business_system';
  if(sector==='Finance / Capital')return 'finance_instrument';
  if(sector==='Market / Exchange')return 'market_exchange';
  return 'offer_listing';
}
function baseFieldsForKind(kind){
  const map={
    consumer_need_fulfillment:['ITEM','NEED_ID','PROFILE_ID','NEED_OR_PURPOSE','VALUE_PRIORITY','PREFERRED_SOURCE','ACCEPTABLE_SUBSTITUTES','QUANTITY','UNIT','FREQUENCY','MAX_PRICE','QUALITY_MINIMUM','URGENCY','SCOPE','VALUE_FORMULA_SCORE','NOTES'],
    shopping_list:['ITEM','LIST_ITEM_ID','PROFILE_ID','ITEM_NAME','NEED_OR_PURPOSE','PREFERRED_SOURCE','ACCEPTABLE_SUBSTITUTES','QUANTITY','UNIT','FREQUENCY','MAX_PRICE','DIET_RESTRICTION','URGENCY','REPEAT_ORDER','VALUE_PRIORITY','NOTES'],
    source_provider:['ITEM','SOURCE_ID','SOURCE_NAME','SOURCE_TYPE','LOCATION','SCOPE','CONTACT','WEBSITE','DELIVERY_AVAILABLE','PICKUP_AVAILABLE','PAYMENT_METHODS','TRUST_LEVEL','QUALITY_HISTORY','PRICE_LEVEL','LINKED_OFFERS','NOTES'],
    offer_listing:['ITEM','OFFER_ID','SOURCE_ID','SOURCE_NAME','ITEM_NAME','CATEGORY','BRAND_OR_PRODUCER','QUANTITY','UNIT','PRICE','AVAILABILITY','QUALITY','ORIGIN','CERTIFICATION','DELIVERY_OPTION','VALUE_FORMULA_SCORE','NOTES'],
    delivery_service:['ITEM','SERVICE_ID','PROVIDER_NAME','SERVICE_TYPE','DELIVERY_AREA','DELIVERY_FEE','MIN_ORDER','SCHEDULE','RELIABILITY','LINKED_SOURCES','LINKED_OFFERS','CONTACT','NOTES'],
    business_system:['ITEM','OBJECT_ID','BUSINESS_PROCESS','CUSTOMER_SEGMENT','DEMAND_SIGNAL','OFFER_OR_SERVICE','CAPACITY_LIMIT','WORKFLOW_STAGE','OWNER_ROLE','INPUTS','OUTPUTS','CONSTRAINTS','RECORD_LINK','IMPROVEMENT_SCORE','NOTES'],
    public_registry:['ITEM','RECORD_ID','RECORD_TYPE','REGISTRY','PUBLIC_BODY','SUBJECT','JURISDICTION','FILING_DATE','EFFECTIVE_DATE','ACCESS_LEVEL','SOURCE_RECORD','VERIFICATION_LEVEL','REQUEST_OR_SEARCH_LINK','STATUS','NOTES'],
    public_service_case:['ITEM','CASE_ID','SERVICE_REQUEST_TYPE','APPLICANT_REF','PUBLIC_BODY','JURISDICTION','INTAKE_DATE','DUE_DATE','CASE_STATUS','DECISION_SUMMARY','NEXT_ACTION','APPEAL_OR_REVIEW_LINK','NOTES'],
    public_permission:['ITEM','APPLICATION_ID','APPLICANT_REF','PERMIT_NUMBER','PERMISSION_TYPE','PUBLIC_BODY','JURISDICTION','ISSUE_DATE','EXPIRY_DATE','CONDITIONS','INSPECTION_STATUS','RENEWAL_STATUS','ENFORCEMENT_STATUS','NOTES'],
    finance_instrument:['ITEM','INSTRUMENT_ID','INSTITUTION','ACCOUNT_OR_PRODUCT_TYPE','APPLICANT_REF','PRINCIPAL','INTEREST_RATE','APR','TERM','PAYMENT_AMOUNT','COLLATERAL','RISK_RATING','STATUS','NOTES'],
    market_exchange:['ITEM','EXCHANGE_OBJECT_ID','MARKETPLACE','BUYER_REF','SELLER_REF','OFFER_ID','BID_ID','ASK_PRICE','BID_AMOUNT','MATCH_STATUS','TRUST_SIGNAL','SETTLEMENT_STATUS','DELIVERY_STATUS','OUTCOME_STATUS','NOTES']
  };
  return map[kind] || ['ITEM','UID','TITLE','STATUS','SCOPE','OVERLAY','NOTES'];
}
function classExtensionFields(label, meaning){
  const t=(label+' '+meaning+' '+currentNodeContextText()).toLowerCase();
  let extra=[];
  if(/food|grocery|vegetable|meat|farm|store|heifer|iga/.test(t))extra=extra.concat(['FOOD_TYPE','PRODUCER_OR_STORE','FRESHNESS_DATE','LOCAL_ORIGIN','ORGANIC','PACKAGE_SIZE','STORAGE_REQUIREMENT']);
  if(/vehicle|trailer|car|truck|van/.test(t))extra=extra.concat(['YEAR','MAKE','MODEL','VIN','ODOMETER','CONDITION','CERTIFIED']);
  if(/apartment|rental|rent|housing|shelter/.test(t))extra=extra.concat(['RENTAL_TYPE','BEDROOMS','BATHROOMS','LEASE_TERM','UTILITIES_INCLUDED','PETS_ALLOWED','AVAILABLE_DATE']);
  if(/land|title|parcel|property|mineral/.test(t))extra=extra.concat(['TITLE_ID','PARCEL_ID','PROPERTY_ADDRESS','LEGAL_DESCRIPTION','OWNER_REF','ENCUMBRANCES','LIENS']);
  if(/manufactur|fabrication|trailer manufacturer|vehicle manufacturer/.test(t))extra=extra.concat(['PRODUCT_CLASS','WORK_ORDER_TYPE','BOM_LINK','CAPACITY','LEAD_TIME','QUALITY_SYSTEM','WARRANTY']);
  if(/credit|loan|mortgage|insurance|capital|finance/.test(t))extra=extra.concat(['CREDIT_SCORE','LTV','PREMIUM','DEDUCTIBLE','COVERAGE_LIMIT','DEFAULT_RISK']);
  return uniqueColumns(extra);
}
function objectFoldersForKind(kind, comparable){
  if(!comparable)return [];
  const folderMap={
    consumer_need_fulfillment:['Profile / Requirements','Shopping List Items','Sources / Providers','Offers / Listings','Delivery / Services','Repeat Orders','Records'],
    shopping_list:['Shopping List Items','Sources / Providers','Offers / Listings','Delivery / Services','Repeat Orders','Records'],
    source_provider:['Source Records','Offers / Listings','Services','Contacts','Evidence / References','Records'],
    offer_listing:['Offers / Listings','Bids','Counter-Offers','Transactions','Records'],
    delivery_service:['Service Providers','Delivery Options','Schedules','Service Quotes','Records'],
    business_system:['Customer / Demand Objects','Offer / Revenue Objects','Operations / Capacity Objects','Supply / Logistics Objects','Records / Improvement Objects'],
    public_registry:['Registry Items','Source Records','Filings','Decisions','Amendments','Records'],
    public_service_case:['Service Requests','Applications','Cases','Decisions','Records'],
    public_permission:['Applications','Permits / Licences','Inspections','Renewals','Enforcement','Records'],
    finance_instrument:['Applications','Accounts / Instruments','Payments','Statements','Risk / Collateral','Records'],
    market_exchange:['Listings / Offers','Buyer Requests','Bids / Proposals','Negotiations','Settlements','Records']
  };
  return (folderMap[kind]||['Items','Records']).map((label,idx)=>({id:'pending_'+idx,label,type:'ObjectFolder',node_role:'ObjectFolder',class_type:'ObjectFolder',virtual:true,folder_type:slug(label),children:[],description:`${label} for this locally-created class.`}));
}
function sampleRowsForColumns(cols,kind,label){
  const rows=[];
  for(let i=1;i<=5;i++){
    const r={__id:`proposal_${slug(label)}_${i}`};
    cols.forEach((c,j)=>{
      let v;
      if(kind==='source_provider'){
        const providers=['Penhold IGA','Bob and Joanne\'s Heifer Farm','Red Deer Farmers Market','Prairie Local Foods','Online Grocery Co-op'];
        if(c==='SOURCE_NAME'||c==='TITLE'||c==='NAME')v=providers[i-1];
        else if(c==='SOURCE_TYPE')v=['Grocery Store','Farm Producer','Farmers Market','Local Supplier','Online Co-op'][i-1];
        else if(c==='DELIVERY_AVAILABLE')v=i%2?'Yes':'No';
        else if(c==='PICKUP_AVAILABLE')v='Yes';
        else if(c==='QUALITY_HISTORY')v=['Good','Excellent','Review','Good','Unknown'][i-1];
      }else if(kind==='shopping_list'){
        if(c==='ITEM_NAME'||c==='TITLE')v=['Milk','Eggs','Ground Beef','Potatoes','Coffee'][i-1];
        else if(c==='QUANTITY')v=['4','2','5','10','1'][i-1];
        else if(c==='UNIT')v=['L','dozen','lb','lb','kg'][i-1];
        else if(c==='FREQUENCY')v=['Weekly','Weekly','Monthly','Biweekly','Monthly'][i-1];
        else if(c==='MAX_PRICE')v=['$8','$9','$35','$12','$20'][i-1];
      }else if(kind==='offer_listing'){
        if(c==='SOURCE_NAME')v=['Penhold IGA','Heifer Farm','Local Market','Grocery Co-op','Online Store'][i-1];
        else if(c==='ITEM_NAME'||c==='TITLE')v=['Milk 4L','Beef Box','Carrots 5lb','Eggs Dozen','Coffee 1kg'][i-1];
        else if(c==='PRICE')v=['$6.49','$120.00','$8.00','$5.50','$18.00'][i-1];
        else if(c==='AVAILABILITY')v=['In stock','Preorder','Seasonal','In stock','Ships 2 days'][i-1];
      }
      if(v===undefined)v=sampleValue(c,i,j);
      r[c]=v;
    });
    rows.push(r);
  }
  return rows;
}
function proposalForNode(label,meaning,kindForced,role,fieldHints){
  const sector=app.activeSector;
  const kind=inferNodeKind(label,meaning,sector,kindForced);
  const comparable=role==='ComparableClass';
  const cols=uniqueColumns(baseFieldsForKind(kind).concat(classExtensionFields(label,meaning)).concat(parseFieldHints(fieldHints))).slice(0,42);
  const confidence=(kindForced&&kindForced!=='auto')?'High':'Medium';
  return {proposal_version:'v2.7',generated_at:new Date().toISOString(),sector,scope:app.activeScope,overlay:app.activeOverlay,parent_node_id:document.getElementById('nbParent')?.value||selectedParentForNewNode(),parent_path:currentNodeContextText(),node_label:label,node_role:role,comparable,inferred_kind:kind,template_confidence:confidence,real_world_meaning:meaning,recommended_object_folders:objectFoldersForKind(kind,comparable).map(f=>f.label),columns:cols,field_types:Object.fromEntries(cols.map(c=>[c,inferFieldType(c)])),sample_rows:sampleRowsForColumns(cols,kind,label),ai_review_notes:'Review inherited template, remove irrelevant fields, add context-specific fields, and confirm object-folder meanings before promoting to permanent sector JSON.'};
}
function promptForProposal(p){return `I am continuing the Economy / Comparator / Business Simulation project.\n\nPlease review and refine this proposed TreeView node and datagrid template. Preserve the current external TreeView schema and do not build UI code. Return a clean JSON-ready node/template proposal and 5 sample rows.\n\nContext:\nSector: ${p.sector}\nScope: ${p.scope}\nOverlay: ${p.overlay}\nParent path: ${p.parent_path}\nParent node id: ${p.parent_node_id}\nNew node label: ${p.node_label}\nNode role: ${p.node_role}\nInferred object kind: ${p.inferred_kind}\nReal-world meaning: ${p.real_world_meaning}\n\nCurrent proposed columns:\n${p.columns.join(', ')}\n\nRecommended object folders:\n${p.recommended_object_folders.join(', ')}\n\nPlease improve the columns based on this exact context, keeping only fields that make sense for rows of this type. Include field types, sort/filter recommendations, and 5 realistic dummy rows.\n\nProposal JSON:\n${JSON.stringify(p,null,2)}`;}
function openNodeBuilder(){
  const n=selectedNode();
  document.getElementById('nbLabel').value='';
  document.getElementById('nbRole').value='ComparableClass';
  document.getElementById('nbParent').value=n?n.id:currentRoot().id;
  document.getElementById('nbSector').value=app.activeSector;
  document.getElementById('nbKind').value='auto';
  document.getElementById('nbConfidence').value='Not generated';
  document.getElementById('nbMeaning').value=`Parent context: ${currentNodeContextText()}\nScope: ${app.activeScope}\nOverlay: ${app.activeOverlay}\nDescribe what rows should represent here.`;
  document.getElementById('nbFieldHints').value='';
  document.getElementById('nbProposal').value='';
  document.getElementById('nbPrompt').value='';
  document.getElementById('nodeBuilderShade').style.display='flex';
}
function generateNodeProposal(){
  const label=document.getElementById('nbLabel').value.trim()||'New Context Node';
  const meaning=document.getElementById('nbMeaning').value.trim();
  const role=document.getElementById('nbRole').value;
  const p=proposalForNode(label,meaning,document.getElementById('nbKind').value,role,document.getElementById('nbFieldHints').value);
  document.getElementById('nbConfidence').value=p.template_confidence+' — '+p.inferred_kind;
  document.getElementById('nbProposal').value=JSON.stringify(p,null,2);
  document.getElementById('nbPrompt').value=promptForProposal(p);
  return p;
}
function currentBuilderProposal(){try{return JSON.parse(document.getElementById('nbProposal').value||'null')}catch(e){return null}}
function saveNodeWithGrid(){
  let p=currentBuilderProposal(); if(!p)p=generateNodeProposal();
  const parent=document.getElementById('nbParent').value.trim()||selectedParentForNewNode();
  const id=slug(parent+'_'+p.node_label+'_'+Date.now()).slice(0,110);
  const folders=objectFoldersForKind(p.inferred_kind,p.comparable).map(f=>({...f,id:id+'__'+slug(f.label),parent_class_id:id,sector:app.activeSector,datagrid_template_id:id+'_grid'}));
  const node={id,label:p.node_label,type:p.node_role,sector:app.activeSector,parent,description:p.real_world_meaning,children:folders,node_role:p.node_role,class_type:p.node_role,comparable:p.comparable,datagrid_template_id:id+'_grid',object_folder_template_id:'LOCAL_'+slug(p.inferred_kind).toUpperCase(),notes:p.real_world_meaning,custom:true};
  app.customNodes.push(node);
  app.customObjects[id]={id,label:p.node_label,type:p.node_role,parent,sector:app.activeSector,description:p.real_world_meaning,datagrid_proposal:p,created_with:'v2.7 Tree Node Builder'};
  saveAll();attachCustomNodes();app.selectedNodeId=id;app.expanded.add(parent);document.getElementById('nodeBuilderShade').style.display='none';render();
}
function exportNodeProposal(){const p=currentBuilderProposal()||generateNodeProposal();const blob=new Blob([JSON.stringify(p,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='datagrid_proposal_'+slug(p.node_label)+'.json';a.click();URL.revokeObjectURL(url);}
function copyNodePrompt(){const txt=document.getElementById('nbPrompt').value||promptForProposal(generateNodeProposal());navigator.clipboard?.writeText(txt).then(()=>alert('AI handoff prompt copied.')).catch(()=>{document.getElementById('nbPrompt').select();document.execCommand('copy');alert('AI handoff prompt copied.');});}
function customProposalForClassNode(n){return n&&app.customObjects[n.id]&&app.customObjects[n.id].datagrid_proposal;}
const prevTemplateObject=templateObject;
templateObject=function(){const c=selectedClass();const p=customProposalForClassNode(c);if(p)return {label:'Local Generated Grid — '+p.node_label,columns:p.columns,fields:p.columns.map(field=>({field,type:p.field_types?.[field]||'text'}))};return prevTemplateObject();};
const prevTemplateId=templateId;
templateId=function(){const c=selectedClass();const p=customProposalForClassNode(c);if(p)return c.datagrid_template_id||('LOCAL_GRID_'+slug(p.node_label).toUpperCase());return prevTemplateId();};
const prevGetGridRows=getGridRows;
getGridRows=function(){const c=selectedClass();const p=customProposalForClassNode(c);if(p&&Array.isArray(p.sample_rows))return p.sample_rows.map((r,i)=>({...r,__id:`row_${slug(c.id)}_${i+1}`}));return prevGetGridRows();};
const prevClassSpecificColumns=classSpecificColumns;
classSpecificColumns=function(profile){const c=selectedClass();const p=customProposalForClassNode(c);if(p)return [];return prevClassSpecificColumns(profile);};
const prevRenderDefinitions=renderDefinitions;
renderDefinitions=function(){const c=selectedClass();const p=customProposalForClassNode(c);if(!p){prevRenderDefinitions();return;}document.getElementById('workspace').innerHTML=`<div class="callout"><h3>Objects / Definitions — ${esc(contextTitle())}</h3><p>This is a locally-created TreeView node with a generated contextual datagrid proposal. Use Export Proposal JSON or Export JSON to move it into the permanent sector data later.</p></div><div class="cards"><div class="card"><h3>Generated node</h3><p>${esc(p.node_label)}<br>${esc(p.inferred_kind)}</p><span class="tag">${esc(p.template_confidence)} confidence</span></div><div class="card"><h3>Columns</h3><p>${p.columns.length} proposed columns<br>${esc(p.columns.slice(0,8).join(', '))}${p.columns.length>8?'...':''}</p><span class="tag">local template</span></div><div class="card"><h3>Object folders</h3><p>${esc(p.recommended_object_folders.join(', '))}</p><span class="tag">generated</span></div></div>`;};
const prevInspectorContext=inspectorContext;
inspectorContext=function(){const base=prevInspectorContext();if(base.level===2&&selectedClass()){const c=selectedClass();const p=customProposalForClassNode(c);if(p)return {level:2,title:c.label,desc:`Locally-created node. Generated datagrid kind: ${p.inferred_kind}. ${p.columns.length} columns and ${p.sample_rows.length} dummy rows are available.`,fields:{node_id:c.id,parent:c.parent,sector:c.sector,kind:p.inferred_kind,template_confidence:p.template_confidence,columns:p.columns.join(', '),object_folders:p.recommended_object_folders.join(', '),meaning:p.real_world_meaning},source:'Local Tree Node'};}if(base.level===2){const n=selectedNode();return {level:2,title:base.title,desc:base.desc,fields:{node_id:n?.id,type:n?.type,class_type:n?.class_type,node_role:n?.node_role,comparable:!!n?.comparable,datagrid_template_id:n?.datagrid_template_id,object_folder_template_id:n?.object_folder_template_id,description:n?.description},source:base.source};}return base;};
function installButtons(){
  const tools=document.querySelector('.workspaceTools .toolButtons');
  if(tools&&!document.getElementById('addTreeNodeBtn')){
    const b=document.createElement('button');b.className='smallBtn';b.id='addTreeNodeBtn';b.textContent='Add Tree Node';b.onclick=openNodeBuilder;
    const g=document.createElement('button');g.className='smallBtn';g.id='gridProposalBtn';g.textContent='Grid Proposal';g.onclick=()=>{openNodeBuilder();const n=selectedNode();if(n){document.getElementById('nbLabel').value=(n.label||'')+' Variant';document.getElementById('nbMeaning').value=`Based on selected context: ${currentNodeContextText()}\nCreate/refine a datagrid for this context.`;}generateNodeProposal();};
    tools.insertBefore(g,tools.firstChild);tools.insertBefore(b,tools.firstChild);
  }
  document.getElementById('closeNodeBuilder').onclick=()=>document.getElementById('nodeBuilderShade').style.display='none';
  document.getElementById('genNodeGrid').onclick=generateNodeProposal;
  document.getElementById('saveNodeWithGrid').onclick=saveNodeWithGrid;
  document.getElementById('exportNodeProposal').onclick=exportNodeProposal;
  document.getElementById('copyNodePrompt').onclick=copyNodePrompt;
}
installButtons();
app.evidence.unshift('REC | v2.7 adds local Tree node builder, contextual datagrid proposal, AI handoff prompt, and 5 dummy rows | Saved');
render();
})();
