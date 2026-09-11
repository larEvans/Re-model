import { useMemo, useState } from 'react';

const listings = [
  { id: 1, source: 'HUD Home Store', title: 'Brick ranch with strong rental upside', address: '1824 Maple Ave, Cleveland, OH', price: 92000, market: 151000, arv: 178000, rehab: 42000, beds: 3, baths: 1, sqft: 1280, days: 12, type: 'Foreclosure', score: 91, image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=80', url: 'https://www.hudhomestore.gov/' },
  { id: 2, source: 'Auction.com', title: 'Investor special near university district', address: '4418 Parkwood Dr, Memphis, TN', price: 78500, market: 126000, arv: 162000, rehab: 51000, beds: 3, baths: 2, sqft: 1460, days: 4, type: 'Auction', score: 86, image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80', url: 'https://www.auction.com/' },
  { id: 3, source: 'Fannie Mae HomePath', title: 'Cottage ready for a value-add refresh', address: '702 Willow St, Birmingham, AL', price: 104000, market: 154000, arv: 196000, rehab: 38000, beds: 2, baths: 2, sqft: 1190, days: 19, type: 'REO', score: 88, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80', url: 'https://www.homepath.com/' },
  { id: 4, source: 'HomeSales.gov', title: 'Large corner lot with cosmetic upside', address: '3901 Spruce Ln, Detroit, MI', price: 67000, market: 119000, arv: 149000, rehab: 46000, beds: 4, baths: 2, sqft: 1715, days: 8, type: 'Government', score: 82, image: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=900&q=80', url: 'https://homesales.gov/' },
  { id: 5, source: 'Zillow', title: 'Price-cut bungalow with finished attic', address: '2617 Oak St, St. Louis, MO', price: 119000, market: 164000, arv: 205000, rehab: 35000, beds: 3, baths: 2, sqft: 1535, days: 31, type: 'Price cut', score: 80, image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=900&q=80', url: 'https://www.zillow.com/' },
  { id: 6, source: 'Realtor.com', title: 'Estate sale duplex conversion candidate', address: '915 Adams Ave, Toledo, OH', price: 89000, market: 137000, arv: 184000, rehab: 57000, beds: 4, baths: 2, sqft: 1920, days: 23, type: 'Fixer-upper', score: 77, image: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=900&q=80', url: 'https://www.realtor.com/' },
];

const stages = ['Lead', 'Analyzing', 'Offer', 'Under contract', 'Renovation', 'Listed', 'Closed'];
const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const number = new Intl.NumberFormat('en-US');

function Logo() { return <div className="logo"><span>R</span><strong>Re:model</strong></div>; }
function Icon({ children }) { return <span className="icon">{children}</span>; }

function Sidebar({ page, setPage }) {
  const links = [['discover','⌕','Discover'],['pipeline','◇','Pipeline'],['projects','▦','Projects'],['analytics','⌁','Analytics']];
  return <aside className="sidebar">
    <Logo />
    <nav>{links.map(([id, icon, label]) => <button key={id} className={page === id ? 'active' : ''} onClick={() => setPage(id)}><Icon>{icon}</Icon>{label}</button>)}</nav>
    <div className="side-bottom"><button><Icon>?</Icon>Resources</button><button><Icon>⚙</Icon>Settings</button><div className="profile"><span>JD</span><div><strong>Jordan Davis</strong><small>Pro investor</small></div></div></div>
  </aside>;
}

function Metric({ label, value, note, tone }) { return <div className={`metric ${tone || ''}`}><span>{label}</span><strong>{value}</strong><small>{note}</small></div>; }

function Discover({ onTrack }) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All opportunities');
  const [maxPrice, setMaxPrice] = useState(150000);
  const [selected, setSelected] = useState(listings[0]);
  const filtered = useMemo(() => listings.filter(x => `${x.address} ${x.title} ${x.source}`.toLowerCase().includes(query.toLowerCase()) && (type === 'All opportunities' || x.type === type) && x.price <= maxPrice), [query,type,maxPrice]);
  const discount = Math.round((1-selected.price/selected.market)*100);
  const investment = selected.price + selected.rehab + 9000;
  const profit = selected.arv-investment;
  const roi = Math.round(profit/investment*100);

  return <>
    <header className="topbar"><div><h1>Find your next value-add property</h1><p>One search across distressed, government, auction, and public listings.</p></div><button className="primary" onClick={() => onTrack(selected)}>＋ Track this deal</button></header>
    <section className="search-panel">
      <div className="search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search city, neighborhood, ZIP, or address" /></div>
      <select value={type} onChange={e=>setType(e.target.value)}><option>All opportunities</option>{[...new Set(listings.map(x=>x.type))].map(x=><option key={x}>{x}</option>)}</select>
      <label className="price-filter">Max {currency.format(maxPrice)}<input type="range" min="70000" max="250000" step="5000" value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))}/></label>
      <button className="primary">Search</button>
    </section>
    <div className="source-row"><span>Searching trusted sources</span>{['HUD','Auction.com','HomePath','HomeSales.gov','Zillow','Realtor.com'].map(x=><b key={x}>✓ {x}</b>)}</div>
    <div className="discover-layout">
      <section className="results">
        <div className="section-title"><div><h2>{filtered.length} opportunities</h2><p>Ranked by estimated value gap and renovation return</p></div><select><option>Best opportunity</option><option>Lowest price</option><option>Highest discount</option></select></div>
        <div className="listing-grid">{filtered.map(item => <article key={item.id} className={`listing ${selected.id===item.id?'selected':''}`} onClick={()=>setSelected(item)}>
          <div className="photo" style={{backgroundImage:`url(${item.image})`}}><span className="badge">{item.type}</span><span className="score">{item.score}<small>deal score</small></span></div>
          <div className="listing-body"><div className="source">{item.source} · {item.days} days listed</div><h3>{item.title}</h3><p>{item.address}</p><div className="facts"><span>{item.beds} bd</span><span>{item.baths} ba</span><span>{number.format(item.sqft)} sqft</span></div><div className="prices"><div><small>Asking</small><strong>{currency.format(item.price)}</strong></div><div><small>Est. market</small><strong>{currency.format(item.market)}</strong></div><div className="green"><small>Below market</small><strong>{Math.round((1-item.price/item.market)*100)}%</strong></div></div></div>
        </article>)}</div>
      </section>
      <aside className="deal-panel">
        <div className="deal-head"><span>DEAL SNAPSHOT</span><button>•••</button></div><h2>{selected.address.split(',')[0]}</h2><p>{selected.address.split(',').slice(1).join(',')}</p>
        <div className="hero-number"><small>Estimated value gap</small><strong>{currency.format(selected.market-selected.price)}</strong><span>{discount}% below market</span></div>
        <div className="metrics"><Metric label="Purchase" value={currency.format(selected.price)} note="Current asking price"/><Metric label="Renovation" value={currency.format(selected.rehab)} note="Initial estimate"/><Metric label="After repair value" value={currency.format(selected.arv)} note="Based on nearby comps" tone="highlight"/><Metric label="Projected profit" value={currency.format(profit)} note={`${roi}% estimated ROI`} tone="highlight"/></div>
        <div className="bar-label"><span>Capital stack</span><b>{currency.format(investment)}</b></div><div className="stack"><i style={{width:`${selected.price/investment*100}%`}}/><i style={{width:`${selected.rehab/investment*100}%`}}/><i/></div><div className="legend"><span>● Purchase</span><span>● Rehab</span><span>● Costs</span></div>
        <button className="primary wide" onClick={()=>onTrack(selected)}>Add to pipeline →</button><a className="external" href={selected.url} target="_blank" rel="noreferrer">View original listing ↗</a><p className="disclaimer">Estimates are for screening only. Verify listing details, title, repairs, and comparable sales before making an offer.</p>
      </aside>
    </div>
  </>;
}

function Pipeline({ deals, moveDeal }) {
  return <><header className="topbar"><div><h1>Deal pipeline</h1><p>Move every opportunity from first look through profitable exit.</p></div><button className="primary">＋ Add property</button></header>
  <div className="pipeline-summary"><Metric label="Active opportunities" value={deals.length} note="Across all stages"/><Metric label="Potential purchase volume" value={currency.format(deals.reduce((s,d)=>s+d.price,0))} note="Asking price total"/><Metric label="Projected profit" value={currency.format(deals.reduce((s,d)=>s+(d.arv-d.price-d.rehab-9000),0))} note="Before taxes" tone="highlight"/></div>
  <div className="kanban">{stages.map(stage=><section className="column" key={stage}><header><b>{stage}</b><span>{deals.filter(d=>d.stage===stage).length}</span></header>{deals.filter(d=>d.stage===stage).map(deal=><article className="deal-card" key={deal.id}><span className="mini-source">{deal.source}</span><h3>{deal.address.split(',')[0]}</h3><p>{deal.address.split(',').slice(1).join(',')}</p><div><b>{currency.format(deal.price)}</b><span>{deal.score} score</span></div><select value={deal.stage} onChange={e=>moveDeal(deal.id,e.target.value)}>{stages.map(x=><option key={x}>{x}</option>)}</select></article>)}</section>)}</div></>;
}

function Projects({ deals }) {
 const active=deals.filter(x=>['Under contract','Renovation','Listed'].includes(x.stage));
 return <><header className="topbar"><div><h1>Renovation command center</h1><p>Control budgets, milestones, and project risk from one place.</p></div><button className="primary">＋ New project</button></header>
 <div className="empty-or-projects">{active.length ? active.map((d,i)=><article className="project" key={d.id}><div className="project-photo" style={{backgroundImage:`url(${d.image})`}}/><div><span className="badge dark">{d.stage}</span><h2>{d.address.split(',')[0]}</h2><p>{d.address}</p><div className="progress"><i style={{width:`${i?38:64}%`}}/></div><small>{i?38:64}% renovation complete</small></div><div className="project-numbers"><Metric label="Budget" value={currency.format(d.rehab)} note="Approved scope"/><Metric label="Spent" value={currency.format(d.rehab * (i ? 0.32 : 0.57))} note="To date"/><Metric label="Projected ROI" value={`${Math.round((d.arv-d.price-d.rehab-9000)/(d.price+d.rehab+9000)*100)}%`} note="Current forecast" tone="highlight"/></div></article>) : <div className="empty"><b>▦</b><h2>No active renovations yet</h2><p>Move a deal to Under contract or Renovation to start managing it here.</p></div>}</div></>;
}

function Analytics({ deals }) { const profit=deals.map(d=>d.arv-d.price-d.rehab-9000); return <><header className="topbar"><div><h1>Portfolio analytics</h1><p>Understand the returns and risk behind every acquisition decision.</p></div><button className="outline">Export report</button></header><div className="analytics-grid"><Metric label="Pipeline value" value={currency.format(deals.reduce((s,d)=>s+d.arv,0))} note="Combined after-repair value"/><Metric label="Expected profit" value={currency.format(profit.reduce((a,b)=>a+b,0))} note="Across tracked deals" tone="highlight"/><Metric label="Average deal score" value={Math.round(deals.reduce((s,d)=>s+d.score,0)/deals.length||0)} note="Opportunity quality"/><Metric label="Average ROI" value={`${Math.round(profit.reduce((a,b)=>a+b,0)/deals.reduce((s,d)=>s+d.price+d.rehab+9000,0)*100||0)}%`} note="Projected return" tone="highlight"/></div><section className="chart-card"><h2>Projected profit by property</h2>{deals.map((d,i)=><div className="chart-row" key={d.id}><span>{d.address.split(',')[0]}</span><div><i style={{width:`${Math.max(8,profit[i]/Math.max(...profit)*100)}%`}}/></div><b>{currency.format(profit[i])}</b></div>)}</section></> }

export default function App() {
 const [page,setPage]=useState('discover');
 const [deals,setDeals]=useState([{...listings[2],stage:'Analyzing'},{...listings[0],stage:'Renovation'}]);
 const track=(item)=>{setDeals(current=>current.some(x=>x.id===item.id)?current:[...current,{...item,stage:'Lead'}]);setPage('pipeline')};
 const moveDeal=(id,stage)=>setDeals(ds=>ds.map(d=>d.id===id?{...d,stage}:d));
 return <div className="app"><Sidebar page={page} setPage={setPage}/><main className="main">{page==='discover'&&<Discover onTrack={track}/>} {page==='pipeline'&&<Pipeline deals={deals} moveDeal={moveDeal}/>} {page==='projects'&&<Projects deals={deals}/>} {page==='analytics'&&<Analytics deals={deals}/>}</main></div>;
}
