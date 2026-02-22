import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════
   ZUKA — Tinder DNA × Ugandan Market Soul
   Tinder exact colors: #FD267A → #FF7854 gradient
   Design: card-first, bold, electric, swipe-culture energy
══════════════════════════════════════════════════════════ */

const CSS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Nunito+Sans:ital,opsz,wght@0,6..12,300;0,6..12,400;0,6..12,500;0,6..12,600;1,6..12,300&display=swap');

    *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
    ::-webkit-scrollbar{display:none}

    /* ── animations ── */
    @keyframes fadeUp    {from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn    {from{opacity:0}to{opacity:1}}
    @keyframes zoomIn    {from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}}
    @keyframes slideUp   {from{opacity:0;transform:translateY(60px)}to{opacity:1;transform:translateY(0)}}
    @keyframes slideDown {from{opacity:0;transform:translateY(-30px)}to{opacity:1;transform:translateY(0)}}
    @keyframes float     {0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
    @keyframes spin      {to{transform:rotate(360deg)}}
    @keyframes pulse     {0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
    @keyframes heartPop  {0%{transform:scale(0);opacity:1}60%{transform:scale(1.6);opacity:1}100%{transform:scale(2);opacity:0}}
    @keyframes ripple    {to{transform:scale(6);opacity:0}}
    @keyframes flame     {0%,100%{transform:scale(1) rotate(-2deg)}50%{transform:scale(1.1) rotate(2deg)}}
    @keyframes gBrand    {0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
    @keyframes swipeL    {to{transform:translateX(-160%) rotate(-20deg);opacity:0}}
    @keyframes swipeR    {to{transform:translateX(160%) rotate(20deg);opacity:0}}
    @keyframes cardIn    {from{opacity:0;transform:translateY(40px) scale(0.94)}to{opacity:1;transform:translateY(0) scale(1)}}
    @keyframes toastIn   {from{transform:translateY(-80px);opacity:0}to{transform:translateY(0);opacity:1}}
    @keyframes toastOut  {from{transform:translateY(0);opacity:1}to{transform:translateY(-80px);opacity:0}}
    @keyframes dotBounce {0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-8px)}}
    @keyframes shimmer   {0%{background-position:-200% 0}100%{background-position:200% 0}}
    @keyframes gradShift {0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
    @keyframes expandW   {from{width:0}to{width:100%}}
    @keyframes notifSlide{0%{transform:translateX(110%);opacity:0}12%,85%{transform:translateX(0);opacity:1}100%{transform:translateX(110%);opacity:0}}

    .press:active{transform:scale(0.93)!important;transition:transform .1s ease!important}
    .lift{transition:transform .22s ease,box-shadow .22s ease}
    .lift:active{transform:scale(0.965)!important}
  `}</style>
);

/* ── TINDER EXACT DESIGN TOKENS ─────────────────────────────── */
const C = {
  /* Tinder brand */
  pink:       "#FD267A",
  orange:     "#FF7854",
  flame1:     "#FD297B",
  flame2:     "#FF5864",
  flame3:     "#FF655B",
  superBlue:  "#4DCAFD",
  boostPurp:  "#8A6FF5",
  likeGreen:  "#4CCC93",
  /* bg system */
  bg:         "#0A0A0F",
  bgCard:     "#13131A",
  bgCard2:    "#1C1C26",
  bgInput:    "rgba(255,255,255,0.07)",
  /* text */
  white:      "#FFFFFF",
  textSub:    "rgba(255,255,255,0.6)",
  textDim:    "rgba(255,255,255,0.28)",
  /* borders */
  border:     "rgba(255,255,255,0.09)",
  borderMid:  "rgba(255,255,255,0.15)",
};

/* Gradients */
const G = {
  brand:   `linear-gradient(135deg, ${C.pink} 0%, ${C.flame2} 50%, ${C.orange} 100%)`,
  brandV:  `linear-gradient(180deg, ${C.pink} 0%, ${C.orange} 100%)`,
  flame:   `linear-gradient(135deg, #FD297B 0%, #FF5864 50%, #FF655B 100%)`,
  super:   `linear-gradient(135deg, #4DCAFD 0%, #3B9EFF 100%)`,
  boost:   `linear-gradient(135deg, #8A6FF5 0%, #C064CF 100%)`,
  like:    `linear-gradient(135deg, #4CCC93 0%, #27C06F 100%)`,
  nope:    `linear-gradient(135deg, #FF6B6B 0%, #EE2222 100%)`,
  card:    "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
  mesh:    `radial-gradient(ellipse at 20% 0%, rgba(253,38,122,0.18) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 100%, rgba(255,120,84,0.12) 0%, transparent 55%),
            radial-gradient(ellipse at 50% 50%, rgba(141,111,245,0.06) 0%, transparent 70%)`,
  dark:    "linear-gradient(180deg, rgba(253,38,122,0.08) 0%, rgba(10,10,15,0) 100%)",
  overlay: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)",
};

const F = {
  head: "'Nunito', sans-serif",
  body: "'Nunito Sans', sans-serif",
};

/* ── PRODUCTS ─────────────────────────────────────────────────── */
const PRODUCTS = [
  { id:1, seller:"Nalongo Couture",  handle:"@nalongo.couture",  avatar:"👩🏿", verified:true,  title:"Ankara Wrap Dress",        tagline:"Limited edition · Only 6 left",      price:45000,   oldPrice:68000,   cat:"Fashion",     emoji:"👗",    bg:"linear-gradient(145deg,#4A1942,#1A0A1A)", accent:"#E91E8C", likes:4821,  comments:312,  saves:891,  rating:4.9, reviews:203, stock:6,  loc:"Owino Market, Kampala",   desc:"Premium Ankara fabric from Lagos. Hand-stitched, double reinforced seams. Sizes XS–2XL. Each dress is one of a kind — the pattern is unique to every cut." },
  { id:2, seller:"Farm Direct UG",   handle:"@farmdirect.ug",    avatar:"👨🏿‍🌾", verified:false, title:"Organic Matooke Bundle",   tagline:"Same-day farm delivery · No chemicals", price:18000,   oldPrice:25000,   cat:"Food",        emoji:"🍌",   bg:"linear-gradient(145deg,#0A2E0A,#1A1A0A)", accent:"#4CCC93", likes:2103,  comments:89,   saves:445,  rating:4.8, reviews:412, stock:40, loc:"Mbarara Farm",            desc:"Harvested this morning on our family farm. Delivered in biodegradable wrapping. Minimum 1 bunch (~8kg). Real farm-to-door freshness." },
  { id:3, seller:"TechVault KLA",    handle:"@techvault.kla",    avatar:"👨🏿‍💻", verified:true,  title:"iPhone 15 · Sealed Box",   tagline:"With receipt & local warranty",       price:2850000, oldPrice:3400000, cat:"Tech",        emoji:"📱",    bg:"linear-gradient(145deg,#0A1A3A,#050A20)", accent:"#4DCAFD", likes:9234,  comments:1203, saves:3210, rating:4.7, reviews:156, stock:3,  loc:"Kikuubo, Kampala",        desc:"Brand new sealed iPhone 15 128GB. All colours available. Official Ugandan warranty, OEM charger and cable included. Mobile Money accepted." },
  { id:4, seller:"Mama Aisha",       handle:"@mama.aisha",       avatar:"👩🏿‍🍳", verified:true,  title:"Rolex Platter — 3 pcs",    tagline:"Hot delivery in 20 mins 🔥",          price:15000,   oldPrice:21000,   cat:"Food",        emoji:"🌯",    bg:"linear-gradient(145deg,#2E1A0A,#1A0A00)", accent:"#FF7854", likes:18432, comments:2341, saves:6780, rating:5.0, reviews:1891,stock:99, loc:"Wandegeya, Kampala",      desc:"Kampala's most loved Rolex. Fresh eggs, crisp cabbage, tomatoes and onion in hot chapati. Order by 9PM for same-evening delivery. Clean oil only." },
  { id:5, seller:"QueenRich Hair",   handle:"@queenrich.hair",   avatar:"👸🏿",  verified:true,  title:"Brazilian Lace Wig 24\"",  tagline:"100% human hair · Ships today",       price:320000,  oldPrice:500000,  cat:"Beauty",      emoji:"💆🏿‍♀️", bg:"linear-gradient(145deg,#2A0A3A,#150020)", accent:"#8A6FF5", likes:12081, comments:834,  saves:4320, rating:4.8, reviews:567, stock:8,  loc:"Ntinda, Kampala",         desc:"Virgin Brazilian human hair. Pre-plucked hairline, bleached knots. Fits 21–23 inch head. Adjustable straps, clips. Free silk cap included." },
  { id:6, seller:"Jua Kali Works",   handle:"@juakali.works",    avatar:"👨🏿‍🔧", verified:false, title:"L-Shape Sofa Set",         tagline:"Custom made in 14 days",              price:1200000, oldPrice:1800000, cat:"Furniture",   emoji:"🛋️",    bg:"linear-gradient(145deg,#2A1A0A,#1A0800)", accent:"#FF9F43", likes:762,   comments:98,   saves:210,  rating:4.6, reviews:67,  stock:2,  loc:"Jinja Town",              desc:"Solid hardwood frame, high-density foam cushions. Any fabric colour available. Kampala delivery included. Custom dimensions welcome." },
];

const CATS = ["All","Fashion","Food","Tech","Beauty","Furniture"];
const fmt  = n => n>=1e6?(n/1e6).toFixed(1)+"M":n>=1e3?(n/1e3).toFixed(1)+"k":String(n);
const fmtP = n => "UGX "+n.toLocaleString();
const pct  = (p,o) => Math.round((1-p/o)*100);

/* ── ATOMS ────────────────────────────────────────────────────── */
function BrandBtn({children, onClick, style, outlined, small}){
  return(
    <button onClick={onClick} className="press" style={{
      display:"flex", alignItems:"center", justifyContent:"center", gap:7,
      padding: small ? "10px 20px" : "17px 28px",
      borderRadius:99,
      background: outlined ? "transparent" : G.brand,
      border: outlined ? `2px solid ${C.pink}` : "none",
      color: C.white,
      fontFamily: F.head, fontWeight:800,
      fontSize: small ? 13 : 16,
      cursor:"pointer", letterSpacing:.2,
      boxShadow: outlined ? "none" : `0 8px 32px rgba(253,38,122,0.45)`,
      transition:"all .2s ease",
      ...style
    }}>{children}</button>
  );
}

function GlassCard({children, style, onClick, className}){
  return(
    <div onClick={onClick} className={className} style={{
      background: G.card,
      backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)",
      border:`1px solid ${C.border}`, borderRadius:24,
      ...style
    }}>{children}</div>
  );
}

function Chip({children, color=C.pink, bg, style}){
  return(
    <span style={{
      display:"inline-flex", alignItems:"center", gap:4,
      padding:"4px 12px", borderRadius:99,
      background: bg||`rgba(253,38,122,0.18)`,
      color, fontSize:11, fontFamily:F.head,
      fontWeight:800, letterSpacing:.5,
      ...style
    }}>{children}</span>
  );
}

function Toast({msg, emoji="✅", color=C.likeGreen}){
  return(
    <div style={{
      position:"absolute", top:54, left:14, right:14, zIndex:999,
      background:`rgba(10,10,15,0.92)`, backdropFilter:"blur(20px)",
      border:`1px solid ${color}44`,
      borderRadius:18, padding:"14px 18px",
      display:"flex", alignItems:"center", gap:12,
      animation:"notifSlide 3s cubic-bezier(.34,1.3,.64,1) forwards",
      boxShadow:`0 12px 40px rgba(0,0,0,0.6)`,
    }}>
      <div style={{width:36,height:36,borderRadius:12,background:`${color}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{emoji}</div>
      <span style={{fontFamily:F.body, color:C.white, fontSize:14, fontWeight:600}}>{msg}</span>
    </div>
  );
}

/* ══════════════════════════════
   SPLASH
══════════════════════════════ */
function Splash({onDone}){
  const [p,setP]=useState(0);
  useEffect(()=>{
    const a=setTimeout(()=>setP(1),400);
    const b=setTimeout(()=>setP(2),1100);
    const c=setTimeout(onDone,2900);
    return ()=>[a,b,c].forEach(clearTimeout);
  },[]);

  return(
    <div style={{width:"100%",height:"100%",background:C.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
      {/* mesh */}
      <div style={{position:"absolute",inset:0,background:G.mesh,pointerEvents:"none"}}/>

      {/* giant brand gradient glow */}
      <div style={{position:"absolute",width:320,height:320,borderRadius:"50%",background:G.brand,opacity:.08,filter:"blur(80px)",animation:"pulse 2.5s ease infinite"}}/>

      {/* logo */}
      <div style={{
        width:90,height:90,borderRadius:28,
        background:G.flame,
        display:"flex",alignItems:"center",justifyContent:"center",
        fontSize:42,
        boxShadow:`0 0 80px rgba(253,38,122,0.55), 0 20px 40px rgba(253,38,122,0.35)`,
        opacity:p>=1?1:0,
        transform:p>=1?"scale(1) rotate(0deg)":"scale(0.4) rotate(-20deg)",
        transition:"all .7s cubic-bezier(.34,1.56,.64,1)",
        animation:p>=1?"float 3s ease-in-out infinite":"none",
      }}>🛍️</div>

      {/* wordmark */}
      <div style={{marginTop:20,opacity:p>=2?1:0,transform:p>=2?"translateY(0)":"translateY(16px)",transition:"all .5s ease .1s"}}>
        <div style={{
          fontFamily:F.head, fontWeight:900, fontSize:46,
          background:G.brand, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          backgroundClip:"text", letterSpacing:-1.5, lineHeight:1, textAlign:"center",
        }}>ZUKA</div>
        <div style={{fontFamily:F.body,fontStyle:"italic",color:C.textSub,fontSize:13,letterSpacing:4,marginTop:4,textAlign:"center"}}>Uganda's Video Market</div>
      </div>

      {/* loading dots */}
      <div style={{display:"flex",gap:8,marginTop:48,opacity:p>=2?1:0,transition:"opacity .4s ease .3s"}}>
        {[0,1,2].map(i=>(
          <div key={i} style={{width:8,height:8,borderRadius:"50%",background:G.brand,animation:`dotBounce 1.2s ease ${i*.15}s infinite`}}/>
        ))}
      </div>

      <div style={{position:"absolute",bottom:24,fontFamily:F.body,fontSize:11,color:C.textDim,letterSpacing:3}}>🇺🇬  MADE IN UGANDA</div>
    </div>
  );
}

/* ══════════════════════════════
   ONBOARDING
══════════════════════════════ */
function Onboarding({onDone}){
  const [s,setS]=useState(0);
  const slides=[
    {icon:"🎬",title:"Swipe. Watch.\nThen Buy.",sub:"Browse short product videos like TikTok — but tap once and it's yours.",gradient:"linear-gradient(145deg,#2A0018,#0A0A0F)"},
    {icon:"📱",title:"Pay with\nMobile Money.",sub:"MTN or Airtel checkout in one tap. No card. No bank. Just your number.",gradient:"linear-gradient(145deg,#001A2A,#0A0A0F)"},
    {icon:"💰",title:"Sell &\nEarn Daily.",sub:"Post a 30-second video, go live, and reach thousands of buyers across Uganda.",gradient:"linear-gradient(145deg,#1A1A00,#0A0A0F)"},
  ];
  const sl=slides[s];

  return(
    <div style={{width:"100%",height:"100%",background:C.bg,display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"}}>
      {/* top half - visual */}
      <div style={{flex:1,background:sl.gradient,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",transition:"background .5s ease"}}>
        <div style={{position:"absolute",inset:0,background:G.mesh,opacity:.4,pointerEvents:"none"}}/>
        {/* card tease */}
        <div style={{
          width:200,height:200,borderRadius:40,
          background:G.card,border:`1px solid ${C.borderMid}`,
          backdropFilter:"blur(20px)",
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:90,
          boxShadow:`0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(253,38,122,0.2)`,
          animation:"float 3s ease-in-out infinite",
          position:"relative",zIndex:1,
        }} key={s}>{sl.icon}</div>

        {/* skip */}
        <button onClick={onDone} style={{position:"absolute",top:16,right:16,background:"rgba(255,255,255,0.1)",border:"none",borderRadius:99,padding:"7px 16px",color:C.textSub,fontFamily:F.body,fontSize:13,cursor:"pointer",fontWeight:600}}>Skip</button>
      </div>

      {/* bottom half - text */}
      <div style={{padding:"32px 28px 44px",background:C.bg}}>
        {/* dots */}
        <div style={{display:"flex",gap:7,justifyContent:"center",marginBottom:28}}>
          {slides.map((_,i)=>(
            <div key={i} style={{height:5,borderRadius:3,background:i===s?G.brand:C.bgCard2,width:i===s?32:10,transition:"all .4s cubic-bezier(.34,1.56,.64,1)"}}/>
          ))}
        </div>
        <h2 style={{fontFamily:F.head,fontWeight:900,fontSize:34,color:C.white,lineHeight:1.1,marginBottom:12,whiteSpace:"pre-line"}} key={`t${s}`}>{sl.title}</h2>
        <p style={{fontFamily:F.body,fontSize:16,color:C.textSub,lineHeight:1.7,marginBottom:32}} key={`s${s}`}>{sl.sub}</p>
        <BrandBtn onClick={()=>s<slides.length-1?setS(s+1):onDone()} style={{width:"100%"}}>
          {s<slides.length-1?"Continue →":"Start Shopping 🛍️"}
        </BrandBtn>
      </div>
    </div>
  );
}

/* ══════════════════════════════
   AUTH
══════════════════════════════ */
function Auth({onDone}){
  const [mode,setMode]=useState("login");
  const [momo,setMomo]=useState("mtn");

  const inp={
    width:"100%",padding:"15px 18px",
    background:C.bgInput,border:`1px solid ${C.border}`,
    borderRadius:16,color:C.white,
    fontFamily:F.body,fontSize:15,fontWeight:500,outline:"none",
  };

  return(
    <div style={{width:"100%",height:"100%",background:C.bg,overflowY:"auto",position:"relative"}}>
      {/* top brand strip */}
      <div style={{width:"100%",height:200,background:`linear-gradient(180deg,rgba(253,38,122,0.22) 0%,rgba(10,10,15,0) 100%)`,position:"absolute",top:0,left:0,pointerEvents:"none"}}/>

      <div style={{padding:"52px 24px 36px",position:"relative"}}>
        {/* logo */}
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:40}}>
          <div style={{width:46,height:46,borderRadius:16,background:G.flame,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,boxShadow:`0 8px 24px rgba(253,38,122,0.4)`}}>🛍️</div>
          <div>
            <div style={{fontFamily:F.head,fontWeight:900,fontSize:24,color:C.white,letterSpacing:-1}}>ZUKA</div>
            <div style={{fontFamily:F.body,fontSize:11,color:C.textDim,letterSpacing:2}}>UGANDA'S VIDEO MARKET</div>
          </div>
        </div>

        <h2 style={{fontFamily:F.head,fontWeight:900,fontSize:30,color:C.white,marginBottom:6,lineHeight:1.15}}>
          {mode==="login"?"Welcome back 👋":"Create account 🚀"}
        </h2>
        <p style={{fontFamily:F.body,fontSize:15,color:C.textSub,marginBottom:32,fontWeight:400}}>
          {mode==="login"?"Sign in to continue browsing":"Join millions of Ugandan shoppers"}
        </p>

        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {mode==="signup"&&<input placeholder="Full Name" style={inp}/>}
          <input placeholder="Phone Number (e.g. 0771 234 567)" style={inp}/>
          <input placeholder="Password" type="password" style={inp}/>

          {mode==="signup"&&(
            <div style={{borderRadius:18,padding:18,background:C.bgCard,border:`1px solid ${C.border}`}}>
              <div style={{fontFamily:F.body,fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Mobile Money Provider</div>
              <div style={{display:"flex",gap:10}}>
                {[["mtn","🟡","MTN Money"],["airtel","🔴","Airtel Money"]].map(([id,dot,label])=>(
                  <button key={id} onClick={()=>setMomo(id)} className="press" style={{
                    flex:1,padding:"14px 10px",borderRadius:14,cursor:"pointer",
                    fontFamily:F.head,fontSize:13,fontWeight:700,
                    border:momo===id?`2px solid ${C.pink}`:`1px solid ${C.border}`,
                    background:momo===id?`rgba(253,38,122,0.12)`:"transparent",
                    color:momo===id?C.pink:C.textSub,
                    transition:"all .2s ease",
                    display:"flex",flexDirection:"column",alignItems:"center",gap:6,
                  }}>
                    <span style={{fontSize:22}}>{dot}</span>{label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <BrandBtn onClick={onDone} style={{width:"100%",marginTop:4}}>
            {mode==="login"?"Sign In →":"Create Free Account →"}
          </BrandBtn>

          {/* divider */}
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{flex:1,height:1,background:C.border}}/>
            <span style={{fontFamily:F.body,fontSize:13,color:C.textDim}}>or</span>
            <div style={{flex:1,height:1,background:C.border}}/>
          </div>

          <button className="press" style={{width:"100%",padding:17,borderRadius:16,background:C.bgCard,border:`1px solid ${C.border}`,color:C.white,fontFamily:F.head,fontWeight:700,fontSize:15,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
            <span style={{fontSize:20}}>📱</span> Continue with OTP
          </button>
        </div>

        <button onClick={()=>setMode(mode==="login"?"signup":"login")} style={{background:"none",border:"none",marginTop:24,width:"100%",textAlign:"center",cursor:"pointer"}}>
          <span style={{fontFamily:F.body,fontSize:14,color:C.textSub}}>
            {mode==="login"?"New to Zuka? ":"Already have an account? "}
          </span>
          <span style={{fontFamily:F.head,fontSize:14,fontWeight:800,background:G.brand,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
            {mode==="login"?"Create account →":"Sign in →"}
          </span>
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════
   PRODUCT CARD (Tinder-style)
══════════════════════════════ */
function ProductCard({p, onOpen}){
  const [liked,setLiked]=useState(false);
  const [heart,setHeart]=useState(false);
  const [saved,setSaved]=useState(false);
  const cardRef=useRef(null);

  const dblTap=()=>{
    setLiked(true);
    setHeart(true);
    setTimeout(()=>setHeart(false),900);
  };

  const discount=pct(p.price,p.oldPrice);

  return(
    <div ref={cardRef} style={{width:"100%",borderRadius:28,overflow:"hidden",position:"relative",animation:"cardIn .45s cubic-bezier(.34,1.2,.64,1)"}}>
      {/* BIG visual area — Tinder card style */}
      <div onClick={dblTap} style={{width:"100%",height:340,background:p.bg,position:"relative",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
        {/* gradient overlay bottom */}
        <div style={{position:"absolute",inset:0,background:G.overlay,zIndex:1}}/>

        {/* category pill top-left */}
        <div style={{position:"absolute",top:16,left:16,zIndex:3}}>
          <Chip style={{background:"rgba(0,0,0,0.55)",backdropFilter:"blur(10px)",color:C.white,border:`1px solid rgba(255,255,255,0.18)`}}>{p.cat}</Chip>
        </div>

        {/* discount pill top-right */}
        <div style={{position:"absolute",top:16,right:16,zIndex:3}}>
          <Chip color="#0A0A0F" bg={G.like} style={{boxShadow:`0 4px 16px rgba(76,204,147,0.4)`}}>−{discount}%</Chip>
        </div>

        {/* GIANT emoji - Tinder puts big photos */}
        <div style={{
          fontSize:120,
          filter:`drop-shadow(0 20px 60px rgba(0,0,0,0.7))`,
          zIndex:2,
          animation:"float 3s ease-in-out infinite",
          userSelect:"none",
        }}>{p.emoji}</div>

        {/* heart animation */}
        {heart&&<div style={{position:"absolute",zIndex:10,fontSize:90,animation:"heartPop .9s ease forwards",pointerEvents:"none"}}>❤️</div>}

        {/* bottom info overlay — Tinder card style */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,zIndex:3,padding:"20px 18px 16px"}}>
          {/* seller */}
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <div style={{width:30,height:30,borderRadius:10,background:"rgba(255,255,255,0.15)",backdropFilter:"blur(8px)",border:`1px solid rgba(255,255,255,0.2)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{p.avatar}</div>
            <span style={{fontFamily:F.head,fontWeight:700,fontSize:13,color:"rgba(255,255,255,0.9)"}}>{p.seller}{p.verified&&" ✅"}</span>
            <span style={{fontFamily:F.body,fontSize:11,color:"rgba(255,255,255,0.55)"}}>· {p.loc.split(",")[0]}</span>
          </div>
          <h3 style={{fontFamily:F.head,fontWeight:900,fontSize:22,color:C.white,lineHeight:1.15,marginBottom:4}}>{p.title}</h3>
          <p style={{fontFamily:F.body,fontSize:13,color:"rgba(255,255,255,0.7)",lineHeight:1.4}}>{p.tagline}</p>
        </div>

        {/* side action column — Tinder style */}
        <div style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",zIndex:4,display:"flex",flexDirection:"column",gap:14}}>
          {[
            {icon:liked?"❤️":"🤍", count:fmt(p.likes+(liked?1:0)), fn:()=>setLiked(!liked), glow:"rgba(253,38,122,0.5)"},
            {icon:"💬", count:fmt(p.comments), fn:()=>{}, glow:null},
            {icon:saved?"🔖":"🏷️", count:fmt(p.saves), fn:()=>setSaved(!saved), glow:null},
          ].map((a,i)=>(
            <button key={i} onClick={e=>{e.stopPropagation();a.fn();}} style={{
              display:"flex",flexDirection:"column",alignItems:"center",gap:3,
              background:"rgba(0,0,0,0.5)",backdropFilter:"blur(16px)",
              border:`1px solid rgba(255,255,255,0.12)`,
              borderRadius:16,padding:"11px 9px",cursor:"pointer",
              boxShadow:a.glow&&liked?`0 0 20px ${a.glow}`:"none",
              transition:"box-shadow .3s ease",
            }}>
              <span style={{fontSize:20}}>{a.icon}</span>
              <span style={{fontFamily:F.head,fontSize:11,color:C.white,fontWeight:700}}>{a.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom card strip — price + CTA */}
      <div style={{background:C.bgCard,padding:"16px 18px 18px",display:"flex",alignItems:"center",gap:12}}>
        <div style={{flex:1}}>
          <div style={{fontFamily:F.head,fontWeight:900,fontSize:22,background:G.brand,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{fmtP(p.price)}</div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginTop:2}}>
            <span style={{fontFamily:F.body,fontSize:12,color:C.textDim,textDecoration:"line-through"}}>{fmtP(p.oldPrice)}</span>
            <span style={{fontFamily:F.body,fontSize:12,color:"rgba(255,255,255,0.45)"}}>⭐ {p.rating} ({p.reviews})</span>
          </div>
        </div>
        <BrandBtn onClick={()=>onOpen(p)} small style={{borderRadius:16,padding:"13px 22px"}}>
          Buy Now
        </BrandBtn>
      </div>
    </div>
  );
}

/* ══════════════════════════════
   HOME SCREEN
══════════════════════════════ */
function HomeScreen({onOpen, cart}){
  const [cat,setCat]=useState("All");
  const filtered=cat==="All"?PRODUCTS:PRODUCTS.filter(p=>p.cat===cat);

  return(
    <div style={{width:"100%",height:"100%",overflowY:"auto",background:C.bg}}>
      {/* ambient bg */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:280,background:G.dark,pointerEvents:"none"}}/>

      {/* sticky header */}
      <div style={{
        position:"sticky",top:0,zIndex:20,
        background:`rgba(10,10,15,0.88)`,backdropFilter:"blur(22px)",WebkitBackdropFilter:"blur(22px)",
        borderBottom:`1px solid ${C.border}`,
        padding:"12px 18px 10px",
      }}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:13}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:36,height:36,borderRadius:12,background:G.flame,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,boxShadow:`0 4px 16px rgba(253,38,122,0.45)`}}>🛍️</div>
            <div>
              <div style={{fontFamily:F.head,fontWeight:900,fontSize:22,background:G.brand,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:-.5,lineHeight:1}}>ZUKA</div>
            </div>
          </div>
          <div style={{display:"flex",gap:16,alignItems:"center"}}>
            <button style={{background:"none",border:"none",fontSize:22,cursor:"pointer",padding:0}}>🔔</button>
            <div style={{position:"relative"}}>
              <button style={{background:"none",border:"none",fontSize:22,cursor:"pointer",padding:0}}>🛒</button>
              {cart.length>0&&<div style={{position:"absolute",top:-5,right:-5,width:18,height:18,borderRadius:"50%",background:G.brand,color:C.white,fontSize:10,fontWeight:900,fontFamily:F.head,display:"flex",alignItems:"center",justifyContent:"center"}}>{cart.length}</div>}
            </div>
          </div>
        </div>

        {/* Search — Tinder-clean style */}
        <div style={{display:"flex",alignItems:"center",gap:10,background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:16,padding:"12px 16px",marginBottom:13}}>
          <span style={{fontSize:16,opacity:.4}}>🔍</span>
          <span style={{fontFamily:F.body,color:C.textDim,fontSize:14,fontWeight:500}}>Search products & sellers…</span>
        </div>

        {/* category pills */}
        <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:2}}>
          {CATS.map(c=>(
            <button key={c} onClick={()=>setCat(c)} className="press" style={{
              padding:"8px 20px",borderRadius:99,border:"none",flexShrink:0,
              background:c===cat?G.brand:"rgba(255,255,255,0.07)",
              color:c===cat?C.white:C.textSub,
              fontFamily:F.head,fontSize:13,fontWeight:700,
              cursor:"pointer",transition:"all .2s ease",
              boxShadow:c===cat?`0 4px 18px rgba(253,38,122,0.4)`:"none",
            }}>{c}</button>
          ))}
        </div>
      </div>

      {/* feed */}
      <div style={{padding:"14px 16px 100px",display:"flex",flexDirection:"column",gap:4}}>
        {/* Hot flash banner — Tinder card feel */}
        <div style={{
          borderRadius:24,padding:"20px 22px",marginBottom:8,
          background:`linear-gradient(135deg,rgba(253,38,122,0.22) 0%,rgba(255,120,84,0.1) 100%)`,
          border:`1px solid rgba(253,38,122,0.22)`,
          position:"relative",overflow:"hidden",
        }}>
          <div style={{position:"absolute",right:-10,top:-20,fontSize:80,opacity:.18,animation:"flame 2s ease infinite"}}>🔥</div>
          <Chip style={{marginBottom:10,background:G.brand,color:C.white,boxShadow:`0 4px 16px rgba(253,38,122,0.4)`}}>🔥 Flash Sale Live</Chip>
          <div style={{fontFamily:F.head,fontWeight:900,fontSize:22,color:C.white,marginBottom:4}}>Up to 40% off today</div>
          <div style={{fontFamily:F.body,fontSize:13,color:C.textSub}}>Ends at midnight tonight · Don't miss out!</div>
        </div>

        {/* Product cards */}
        {filtered.map((p,i)=>(
          <div key={p.id} style={{marginBottom:16,animation:`fadeUp .4s ease ${i*.08}s both`}}>
            <ProductCard p={p} onOpen={onOpen}/>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════
   PRODUCT DETAIL
══════════════════════════════ */
function ProductDetail({p, onBack, onAddToCart, cart}){
  const [qty,setQty]=useState(1);
  const [tab,setTab]=useState("info");
  const [toast,setToast]=useState(false);
  const inCart=cart.find(i=>i.id===p.id);

  const add=()=>{
    onAddToCart(p,qty);
    setToast(true);
    setTimeout(()=>setToast(false),3100);
  };

  return(
    <div style={{width:"100%",height:"100%",background:C.bg,overflowY:"auto",position:"relative",animation:"slideUp .35s cubic-bezier(.34,1.2,.64,1)"}}>
      {toast&&<Toast msg="Added to cart!" emoji="🛒" color={C.likeGreen}/>}

      {/* Hero — Tinder big card */}
      <div style={{width:"100%",height:340,position:"relative",background:p.bg,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{position:"absolute",inset:0,background:G.overlay}}/>
        <div style={{fontSize:120,zIndex:2,filter:"drop-shadow(0 20px 60px rgba(0,0,0,0.7))",animation:"float 3s ease-in-out infinite"}}>{p.emoji}</div>
        {/* back */}
        <button onClick={onBack} className="press" style={{position:"absolute",top:16,left:16,zIndex:5,width:42,height:42,borderRadius:14,background:"rgba(0,0,0,0.55)",backdropFilter:"blur(12px)",border:`1px solid rgba(255,255,255,0.15)`,color:C.white,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
        <button className="press" style={{position:"absolute",top:16,right:16,zIndex:5,width:42,height:42,borderRadius:14,background:"rgba(0,0,0,0.55)",backdropFilter:"blur(12px)",border:`1px solid rgba(255,255,255,0.15)`,color:C.white,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>♡</button>
        {/* discount */}
        <Chip color="#0A0A0F" bg={G.like} style={{position:"absolute",bottom:16,left:16,zIndex:4,boxShadow:`0 4px 16px rgba(76,204,147,0.5)`,fontSize:13,padding:"6px 14px"}}>−{pct(p.price,p.oldPrice)}% OFF</Chip>
        {/* info over image */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,zIndex:4,padding:"16px 18px 16px"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
            <div style={{width:28,height:28,borderRadius:9,background:"rgba(255,255,255,0.15)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15}}>{p.avatar}</div>
            <span style={{fontFamily:F.head,fontWeight:700,fontSize:12,color:"rgba(255,255,255,0.85)"}}>{p.seller}{p.verified&&" ✅"}</span>
          </div>
          <h2 style={{fontFamily:F.head,fontWeight:900,fontSize:24,color:C.white,lineHeight:1.15}}>{p.title}</h2>
        </div>
      </div>

      <div style={{padding:"20px 18px 140px"}}>
        {/* price + stats row */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
          <div>
            <div style={{fontFamily:F.head,fontWeight:900,fontSize:26,background:G.brand,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{fmtP(p.price)}</div>
            <div style={{fontFamily:F.body,fontSize:13,color:C.textDim,textDecoration:"line-through"}}>{fmtP(p.oldPrice)}</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
            <div style={{display:"flex",gap:6}}>
              <Chip color={C.likeGreen} bg="rgba(76,204,147,0.15)" style={{fontSize:12,padding:"5px 12px"}}>✓ {p.stock} left</Chip>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:5,background:`rgba(253,38,122,0.1)`,borderRadius:99,padding:"5px 12px"}}>
              <span style={{fontSize:13}}>⭐</span>
              <span style={{fontFamily:F.head,fontWeight:800,fontSize:13,color:C.pink}}>{p.rating}</span>
              <span style={{fontFamily:F.body,fontSize:12,color:C.textSub}}>({p.reviews})</span>
            </div>
          </div>
        </div>

        {/* seller card */}
        <GlassCard style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:14,marginBottom:20}}>
          <div style={{width:48,height:48,borderRadius:16,background:`${p.accent}22`,border:`1px solid ${p.accent}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26}}>{p.avatar}</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:F.head,fontWeight:800,color:C.white,fontSize:15}}>{p.seller}{p.verified&&" ✅"}</div>
            <div style={{fontFamily:F.body,fontSize:12,color:C.textDim}}>{p.handle} · 📍 {p.loc}</div>
          </div>
          <BrandBtn outlined small>Follow</BrandBtn>
        </GlassCard>

        {/* tabs — Tinder style */}
        <div style={{display:"flex",gap:0,background:C.bgCard,borderRadius:16,padding:5,marginBottom:20}}>
          {["info","reviews","delivery"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{
              flex:1,padding:"11px 0",borderRadius:12,border:"none",
              background:tab===t?G.brand:"transparent",
              color:tab===t?C.white:C.textSub,
              fontFamily:F.head,fontSize:13,fontWeight:800,
              cursor:"pointer",textTransform:"capitalize",
              boxShadow:tab===t?`0 4px 16px rgba(253,38,122,0.35)`:"none",
              transition:"all .2s ease",
            }}>{t}</button>
          ))}
        </div>

        {tab==="info"&&<p style={{fontFamily:F.body,fontSize:15,color:C.textSub,lineHeight:1.8}}>{p.desc}</p>}
        {tab==="reviews"&&(
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {[["Alice K.","★★★★★","Exactly as shown! Super fast delivery 🔥"],["David M.","★★★★★","Seller very responsive, quality is great!"],["Grace N.","★★★★☆","Will definitely order again. Recommended!"]].map(([name,stars,text],i)=>(
              <GlassCard key={i} style={{padding:"14px 16px"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                  <span style={{fontFamily:F.head,fontWeight:800,color:C.white,fontSize:14}}>{name}</span>
                  <span style={{background:G.brand,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontSize:14}}>{stars}</span>
                </div>
                <p style={{fontFamily:F.body,fontSize:13,color:C.textSub,lineHeight:1.6}}>{text}</p>
              </GlassCard>
            ))}
          </div>
        )}
        {tab==="delivery"&&(
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {[["🛵","Boda Delivery","20–40 mins · Kampala only","UGX 3,000",C.orange],["📦","Standard","1–2 days · All Uganda","UGX 5,000",C.superBlue],["🤝","Free Pickup","Anytime · Seller location","Free",C.likeGreen]].map(([icon,title,sub,cost,color])=>(
              <GlassCard key={title} style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:14}}>
                <div style={{width:44,height:44,borderRadius:14,background:`${color}18`,border:`1px solid ${color}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:F.head,fontWeight:800,color:C.white,fontSize:14}}>{title}</div>
                  <div style={{fontFamily:F.body,fontSize:12,color:C.textDim}}>{sub}</div>
                </div>
                <div style={{fontFamily:F.head,fontWeight:800,fontSize:14,color}}>{cost}</div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>

      {/* sticky bottom — Tinder action bar style */}
      <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"16px 18px 28px",background:`rgba(10,10,15,0.97)`,backdropFilter:"blur(24px)",borderTop:`1px solid ${C.border}`}}>
        <div style={{display:"flex",gap:12}}>
          {/* qty */}
          <GlassCard style={{display:"flex",alignItems:"center",gap:14,borderRadius:16,padding:"13px 18px",flexShrink:0}}>
            <button onClick={()=>setQty(Math.max(1,qty-1))} style={{background:"none",border:"none",color:C.white,fontSize:22,cursor:"pointer",fontWeight:900,lineHeight:1,padding:0}}>−</button>
            <span style={{fontFamily:F.head,fontWeight:900,color:C.white,fontSize:20,minWidth:22,textAlign:"center"}}>{qty}</span>
            <button onClick={()=>setQty(qty+1)} style={{background:"none",border:"none",color:C.white,fontSize:22,cursor:"pointer",fontWeight:900,lineHeight:1,padding:0}}>+</button>
          </GlassCard>
          <BrandBtn onClick={add} style={{flex:1,background:inCart?G.like:G.brand,boxShadow:inCart?`0 8px 28px rgba(76,204,147,0.4)`:`0 8px 28px rgba(253,38,122,0.45)`,borderRadius:18}}>
            {inCart?"✓ In Cart 🛒":"Add to Cart 🛒"}
          </BrandBtn>
        </div>
        <button className="press" style={{width:"100%",marginTop:11,padding:"15px",background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:18,color:C.white,fontFamily:F.head,fontWeight:800,fontSize:15,cursor:"pointer"}}>
          📱 Buy with Mobile Money
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════
   EXPLORE
══════════════════════════════ */
function ExploreScreen({onOpen}){
  const trending=["Kitenge Dresses","iPhone Deals","Rolex & Chips","Human Hair","Matooke","Sofa Sets","Bags","Electronics"];
  return(
    <div style={{width:"100%",height:"100%",overflowY:"auto",padding:"20px 18px 100px",background:C.bg,position:"relative"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:180,background:G.dark,pointerEvents:"none"}}/>
      <div style={{position:"relative"}}>
        <h2 style={{fontFamily:F.head,fontWeight:900,fontSize:28,color:C.white,marginBottom:4}}>Explore</h2>
        <p style={{fontFamily:F.body,fontSize:15,color:C.textSub,marginBottom:22,fontWeight:400}}>Discover Uganda's best sellers</p>

        <div style={{display:"flex",alignItems:"center",gap:10,background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:16,padding:"13px 16px",marginBottom:28}}>
          <span style={{opacity:.4,fontSize:16}}>🔍</span>
          <span style={{fontFamily:F.body,color:C.textDim,fontSize:14,fontWeight:500}}>Search anything…</span>
        </div>

        <div style={{fontFamily:F.head,fontWeight:800,color:C.white,fontSize:16,marginBottom:14}}>🔥 Trending Searches</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:9,marginBottom:32}}>
          {trending.map(t=>(
            <button key={t} className="press" style={{padding:"10px 17px",borderRadius:99,background:C.bgCard,border:`1px solid ${C.border}`,color:C.textSub,fontFamily:F.head,fontSize:13,fontWeight:700,cursor:"pointer"}}>🔍 {t}</button>
          ))}
        </div>

        <div style={{fontFamily:F.head,fontWeight:800,color:C.white,fontSize:16,marginBottom:14}}>🛒 Top Products</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {PRODUCTS.map((p,i)=>(
            <div key={p.id} onClick={()=>onOpen(p)} className="lift" style={{borderRadius:22,overflow:"hidden",cursor:"pointer",animation:`fadeUp .4s ease ${i*.06}s both`,background:C.bgCard,border:`1px solid ${C.border}`}}>
              <div style={{height:120,background:p.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:52,position:"relative"}}>
                {p.emoji}
                <Chip style={{position:"absolute",top:8,left:8,fontSize:10,padding:"2px 9px",background:"rgba(0,0,0,0.55)",color:C.white,border:`1px solid rgba(255,255,255,0.12)`}}>{p.cat}</Chip>
              </div>
              <div style={{padding:"10px 12px 14px"}}>
                <div style={{fontFamily:F.head,fontWeight:800,fontSize:13,color:C.white,marginBottom:3}}>{p.title}</div>
                <div style={{fontFamily:F.head,fontWeight:900,fontSize:14,background:G.brand,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{fmtP(p.price)}</div>
                <div style={{fontFamily:F.body,fontSize:11,color:C.textDim,marginTop:2}}>⭐ {p.rating} · {fmt(p.likes)} likes</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════
   SELL
══════════════════════════════ */
function SellScreen(){
  const [cat,setCat]=useState("");
  const inp={width:"100%",padding:"15px 17px",background:C.bgInput,border:`1px solid ${C.border}`,borderRadius:16,color:C.white,fontFamily:F.body,fontSize:15,fontWeight:500,outline:"none"};
  return(
    <div style={{width:"100%",height:"100%",overflowY:"auto",padding:"20px 18px 100px",background:C.bg,position:"relative"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:200,background:G.dark,pointerEvents:"none"}}/>
      <div style={{position:"relative"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
          <h2 style={{fontFamily:F.head,fontWeight:900,fontSize:28,color:C.white}}>Sell on Zuka</h2>
          <span style={{fontSize:26}}>💰</span>
        </div>
        <p style={{fontFamily:F.body,fontSize:15,color:C.textSub,marginBottom:24,fontWeight:400}}>Post a video. Reach thousands. Earn daily.</p>

        {/* upload zone */}
        <div style={{
          width:"100%",height:200,borderRadius:24,marginBottom:22,cursor:"pointer",
          background:`linear-gradient(145deg,rgba(253,38,122,0.06),rgba(255,120,84,0.03))`,
          border:`2px dashed rgba(253,38,122,0.35)`,
          display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,
        }}>
          <div style={{width:64,height:64,borderRadius:20,background:`rgba(253,38,122,0.15)`,border:`1px solid rgba(253,38,122,0.25)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,boxShadow:`0 8px 24px rgba(253,38,122,0.2)`}}>🎬</div>
          <div style={{fontFamily:F.head,fontWeight:800,color:C.white,fontSize:16}}>Tap to upload video</div>
          <div style={{fontFamily:F.body,fontSize:13,color:C.textDim}}>Max 60 seconds · MP4 or MOV</div>
        </div>

        {[["Product Name","e.g. Kitenge Dress – Size M"],["Price (UGX)","e.g. 45000"],["Stock Available","e.g. 12"]].map(([label,ph])=>(
          <div key={label} style={{marginBottom:16}}>
            <div style={{fontFamily:F.body,fontSize:11,color:C.textDim,letterSpacing:.8,textTransform:"uppercase",marginBottom:8,fontWeight:600}}>{label}</div>
            <input placeholder={ph} style={inp}/>
          </div>
        ))}
        <div style={{marginBottom:16}}>
          <div style={{fontFamily:F.body,fontSize:11,color:C.textDim,letterSpacing:.8,textTransform:"uppercase",marginBottom:8,fontWeight:600}}>Description</div>
          <textarea placeholder="Describe your product…" rows={4} style={{...inp,resize:"none"}}/>
        </div>
        <div style={{marginBottom:24}}>
          <div style={{fontFamily:F.body,fontSize:11,color:C.textDim,letterSpacing:.8,textTransform:"uppercase",marginBottom:10,fontWeight:600}}>Category</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:9}}>
            {["Fashion","Food","Tech","Beauty","Furniture","Other"].map(c=>(
              <button key={c} onClick={()=>setCat(c)} className="press" style={{
                padding:"10px 18px",borderRadius:99,
                border:cat===c?`2px solid ${C.pink}`:`1px solid ${C.border}`,
                background:cat===c?`rgba(253,38,122,0.15)`:"transparent",
                color:cat===c?C.pink:C.textSub,
                fontFamily:F.head,fontSize:13,fontWeight:700,cursor:"pointer",transition:"all .2s ease",
              }}>{c}</button>
            ))}
          </div>
        </div>

        {/* earnings calculator */}
        <GlassCard style={{padding:20,marginBottom:24}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
            <div style={{width:36,height:36,borderRadius:12,background:`rgba(253,38,122,0.15)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>💰</div>
            <div style={{fontFamily:F.head,fontWeight:800,color:C.white,fontSize:16}}>Earnings Calculator</div>
          </div>
          {[["Your listing price","UGX 45,000",C.white],["Zuka fee (7%)","− UGX 3,150",C.flame2],["You receive","UGX 41,850",C.likeGreen]].map(([label,val,color],i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderTop:i===2?`1px solid ${C.border}`:"none",marginTop:i===2?4:0}}>
              <span style={{fontFamily:F.body,fontSize:14,color:C.textSub,fontWeight:500}}>{label}</span>
              <span style={{fontFamily:F.head,fontWeight:i===2?900:700,fontSize:i===2?20:15,color}}>{val}</span>
            </div>
          ))}
        </GlassCard>

        <BrandBtn onClick={()=>{}} style={{width:"100%"}}>🚀 Post My Product</BrandBtn>
      </div>
    </div>
  );
}

/* ══════════════════════════════
   ORDERS
══════════════════════════════ */
function OrdersScreen(){
  const orders=[
    {id:"#ZK‑4821",item:"Ankara Wrap Dress 👗",seller:"Nalongo Couture",price:"UGX 45,000",status:"Delivered",date:"Feb 18",icon:"✅",color:C.likeGreen,bg:"rgba(76,204,147,0.12)"},
    {id:"#ZK‑4820",item:"Rolex Platter 🌯",seller:"Mama Aisha",price:"UGX 15,000",status:"On the way",date:"Feb 21",icon:"🛵",color:C.orange,bg:"rgba(255,120,84,0.12)"},
    {id:"#ZK‑4819",item:"iPhone 15 📱",seller:"TechVault KLA",price:"UGX 2,850,000",status:"Processing",date:"Feb 21",icon:"⏳",color:C.superBlue,bg:"rgba(77,202,253,0.12)"},
  ];
  return(
    <div style={{width:"100%",height:"100%",overflowY:"auto",padding:"20px 18px 100px",background:C.bg,position:"relative"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:180,background:G.dark,pointerEvents:"none"}}/>
      <div style={{position:"relative"}}>
        <h2 style={{fontFamily:F.head,fontWeight:900,fontSize:28,color:C.white,marginBottom:4}}>My Orders 📦</h2>
        <p style={{fontFamily:F.body,fontSize:15,color:C.textSub,marginBottom:24,fontWeight:400}}>Track your purchases</p>
        <div style={{display:"flex",flexDirection:"column",gap:13}}>
          {orders.map((o,i)=>(
            <GlassCard key={o.id} className="lift" style={{padding:"18px",cursor:"pointer",animation:`fadeUp .4s ease ${i*.08}s both`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                <div>
                  <div style={{fontFamily:F.head,fontWeight:900,fontSize:17,color:C.white,marginBottom:3}}>{o.item}</div>
                  <div style={{fontFamily:F.body,fontSize:12,color:C.textDim}}>from {o.seller} · {o.date}</div>
                </div>
                <Chip color={o.color} bg={o.bg} style={{fontSize:12,padding:"5px 13px",whiteSpace:"nowrap"}}>{o.icon} {o.status}</Chip>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:14,borderTop:`1px solid ${C.border}`}}>
                <div style={{fontFamily:F.head,fontWeight:900,fontSize:17,background:G.brand,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{o.price}</div>
                <div style={{fontFamily:F.body,fontSize:12,color:C.textDim}}>{o.id}</div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════
   PROFILE
══════════════════════════════ */
function ProfileScreen(){
  const menu=[
    ["👛","Wallet & Mobile Money","MTN: 0771 234 567",C.orange],
    ["🏪","My Shop","Set up your seller store",C.pink],
    ["🎁","Refer & Earn","UGX 10,000 per referral",C.likeGreen],
    ["⭐","Verified Seller Program","Get your badge faster",C.superBlue],
    ["🔔","Notifications","Manage your alerts",C.boostPurp],
    ["🛡️","Privacy & Security","Keep your account safe",C.textSub],
  ];
  return(
    <div style={{width:"100%",height:"100%",overflowY:"auto",background:C.bg}}>
      {/* hero */}
      <div style={{padding:"40px 20px 28px",background:`linear-gradient(180deg,rgba(253,38,122,0.14) 0%,rgba(10,10,15,0) 100%)`,position:"relative"}}>
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:24}}>
          <div style={{
            width:72,height:72,borderRadius:24,
            background:G.flame,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:34,
            boxShadow:`0 12px 40px rgba(253,38,122,0.5)`,
          }}>👤</div>
          <div>
            <div style={{fontFamily:F.head,fontWeight:900,fontSize:22,color:C.white}}>John Musoke</div>
            <div style={{fontFamily:F.body,fontSize:13,color:C.textSub,marginBottom:6}}>@john_musoke_ug</div>
            <Chip>🇺🇬 Kampala, Uganda</Chip>
          </div>
        </div>

        {/* stats bar */}
        <GlassCard style={{borderRadius:20,display:"flex",overflow:"hidden"}}>
          {[["12","Orders"],["34","Saved"],["8","Reviews"],["3","Referrals"]].map(([val,label],i)=>(
            <div key={label} style={{flex:1,padding:"16px 0",textAlign:"center",borderRight:i<3?`1px solid ${C.border}`:"none"}}>
              <div style={{fontFamily:F.head,fontWeight:900,fontSize:22,background:G.brand,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{val}</div>
              <div style={{fontFamily:F.body,fontSize:11,color:C.textDim,marginTop:2,fontWeight:600}}>{label}</div>
            </div>
          ))}
        </GlassCard>
      </div>

      <div style={{padding:"0 18px 100px"}}>
        <GlassCard style={{borderRadius:22,overflow:"hidden",marginBottom:14}}>
          {menu.map(([icon,title,sub,color],i)=>(
            <div key={title} className="lift" style={{display:"flex",alignItems:"center",gap:14,padding:"15px 16px",borderBottom:i<menu.length-1?`1px solid ${C.border}`:"none",cursor:"pointer"}}>
              <div style={{width:42,height:42,borderRadius:14,background:`${color}18`,border:`1px solid ${color}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{icon}</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:F.head,fontWeight:700,color:C.white,fontSize:14}}>{title}</div>
                <div style={{fontFamily:F.body,fontSize:12,color:C.textDim,marginTop:2,fontWeight:400}}>{sub}</div>
              </div>
              <div style={{color:C.textDim,fontSize:18,fontFamily:F.head}}>›</div>
            </div>
          ))}
        </GlassCard>

        <button className="press" style={{width:"100%",padding:16,borderRadius:18,background:"rgba(255,107,107,0.1)",border:"1px solid rgba(255,107,107,0.22)",color:"#FF6B6B",fontFamily:F.head,fontWeight:800,fontSize:15,cursor:"pointer"}}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════
   BOTTOM NAV — Tinder style
══════════════════════════════ */
function BottomNav({active,onChange}){
  const items=[
    {id:"home",icon:"⊞",label:"Home"},
    {id:"explore",icon:"◎",label:"Explore"},
    {id:"sell",icon:"＋",special:true},
    {id:"orders",icon:"◫",label:"Orders"},
    {id:"profile",icon:"◯",label:"You"},
  ];
  return(
    <div style={{
      display:"flex",alignItems:"center",justifyContent:"space-around",
      padding:"10px 6px 24px",
      background:`rgba(10,10,15,0.97)`,
      backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",
      borderTop:`1px solid ${C.border}`,
    }}>
      {items.map(item=>(
        <button key={item.id} onClick={()=>onChange(item.id)} className="press" style={{
          display:"flex",flexDirection:"column",alignItems:"center",gap:4,
          background:item.special?G.brand:"none",
          border:"none",
          padding:item.special?"13px 24px":"8px 16px",
          borderRadius:item.special?18:10,
          cursor:"pointer",
          boxShadow:item.special?`0 8px 28px rgba(253,38,122,0.5)`:"none",
        }}>
          <span style={{fontSize:22,opacity:!item.special&&active!==item.id?.32:1}}>{item.icon}</span>
          {!item.special&&<span style={{
            fontFamily:F.head,fontSize:10,fontWeight:800,letterSpacing:.3,
            background:active===item.id?G.brand:"none",
            WebkitBackgroundClip:active===item.id?"text":"none",
            WebkitTextFillColor:active===item.id?"transparent":"none",
            color:active===item.id?"transparent":C.textDim,
          }}>{item.label}</span>}
        </button>
      ))}
    </div>
  );
}

/* ══════════════════════════════
   ROOT APP
══════════════════════════════ */
export default function ZukaApp(){
  const [screen,setScreen]=useState("splash");
  const [nav,setNav]=useState("home");
  const [product,setProduct]=useState(null);
  const [cart,setCart]=useState([]);

  const addToCart=(p,qty=1)=>{
    setCart(prev=>{
      const e=prev.find(i=>i.id===p.id);
      return e?prev.map(i=>i.id===p.id?{...i,qty:i.qty+qty}:i):[...prev,{...p,qty}];
    });
  };

  const showNav=screen==="main"&&!product;

  const renderMain=()=>{
    if(product) return <ProductDetail p={product} onBack={()=>setProduct(null)} onAddToCart={addToCart} cart={cart}/>;
    switch(nav){
      case"home":    return <HomeScreen onOpen={setProduct} cart={cart}/>;
      case"explore": return <ExploreScreen onOpen={setProduct}/>;
      case"sell":    return <SellScreen/>;
      case"orders":  return <OrdersScreen/>;
      case"profile": return <ProfileScreen/>;
      default:       return <HomeScreen onOpen={setProduct} cart={cart}/>;
    }
  };

  return(
    <>
      <CSS/>
      <div style={{width:"100%",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#030405"}}>
        {/* Phone shell — like a real device */}
        <div style={{
          width:390,height:780,
          background:C.bg,
          borderRadius:50,
          overflow:"hidden",
          position:"relative",
          display:"flex",flexDirection:"column",
          boxShadow:`
            0 0 0 1px rgba(255,255,255,0.06),
            0 0 0 14px #0C0C12,
            0 0 0 15px rgba(255,255,255,0.04),
            0 50px 120px rgba(0,0,0,0.95),
            0 0 80px rgba(253,38,122,0.08)
          `,
        }}>
          {/* notch */}
          <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:114,height:30,background:"#0C0C12",borderRadius:"0 0 20px 20px",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:"#1A1A22"}}/>
            <div style={{width:52,height:6,borderRadius:3,background:"#1A1A22"}}/>
          </div>

          {/* status bar */}
          <div style={{height:44,display:"flex",alignItems:"flex-end",justifyContent:"space-between",padding:"0 22px 6px",flexShrink:0,position:"relative",zIndex:10}}>
            <span style={{fontFamily:F.head,fontSize:12,fontWeight:700,color:C.textDim}}>9:41</span>
            <div style={{display:"flex",gap:5,alignItems:"center"}}>
              <span style={{fontSize:11}}>📶</span><span style={{fontSize:11}}>🔋</span>
            </div>
          </div>

          {/* content */}
          <div style={{flex:1,overflow:"hidden",position:"relative"}}>
            {screen==="splash"     &&<Splash     onDone={()=>setScreen("onboarding")}/>}
            {screen==="onboarding" &&<Onboarding onDone={()=>setScreen("auth")}/>}
            {screen==="auth"       &&<Auth        onDone={()=>setScreen("main")}/>}
            {screen==="main"       &&renderMain()}
          </div>

          {showNav&&<BottomNav active={nav} onChange={id=>{setNav(id);setProduct(null);}}/>}
        </div>
      </div>
    </>
  );
}
