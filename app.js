/* ═══════════════════════════════════════════════════════════
   GeoPulse India — Core Application Logic
   Nifty50 Geopolitical Intelligence & Options Trading Platform
   ═══════════════════════════════════════════════════════════ */

/* ── TOP 50 INFLUENCERS ─────────────────────────────── */
const INFLUENCERS = [
  {id:1,name:"Narendra Modi",handle:"@narendramodi",plt:["x"],cat:"political",flag:"🇮🇳",role:"Prime Minister of India",impact:96,avatar:"#e65100",init:"NM",followers:"95.2M"},
  {id:2,name:"Nirmala Sitharaman",handle:"@nsitharaman",plt:["x"],cat:"financial",flag:"🇮🇳",role:"Finance Minister, India",impact:91,avatar:"#6a1b9a",init:"NS",followers:"7.8M"},
  {id:3,name:"Mukesh Ambani",handle:"@MukeshDAmbani",plt:["x"],cat:"corporate",flag:"🇮🇳",role:"Chairman, Reliance Industries",impact:89,avatar:"#1565c0",init:"MA",followers:"12.4M"},
  {id:4,name:"Gautam Adani",handle:"@gautam_adani",plt:["x"],cat:"corporate",flag:"🇮🇳",role:"Chairman, Adani Group",impact:87,avatar:"#2e7d32",init:"GA",followers:"8.6M"},
  {id:5,name:"Jerome Powell",handle:"@federalreserve",plt:["x"],cat:"central_bank",flag:"🇺🇸",role:"Chair, US Federal Reserve",impact:96,avatar:"#263238",init:"JP",followers:"3.1M"},
  {id:6,name:"Donald Trump",handle:"@realDonaldTrump",plt:["x","truth"],cat:"political",flag:"🇺🇸",role:"47th US President",impact:95,avatar:"#bf360c",init:"DT",followers:"94.3M"},
  {id:7,name:"Elon Musk",handle:"@elonmusk",plt:["x"],cat:"tech_political",flag:"🇺🇸",role:"CEO Tesla/SpaceX, Owner X",impact:92,avatar:"#1976d2",init:"EM",followers:"178M"},
  {id:8,name:"Christine Lagarde",handle:"@Lagarde",plt:["x"],cat:"central_bank",flag:"🇪🇺",role:"President, European Central Bank",impact:86,avatar:"#1a237e",init:"CL",followers:"2.3M"},
  {id:9,name:"Warren Buffett",handle:"@WarrenBuffett",plt:["x"],cat:"investor",flag:"🇺🇸",role:"CEO, Berkshire Hathaway",impact:90,avatar:"#1b5e20",init:"WB",followers:"2.7M"},
  {id:10,name:"Ray Dalio",handle:"@RayDalio",plt:["x","li"],cat:"investor",flag:"🇺🇸",role:"Founder, Bridgewater Associates",impact:83,avatar:"#004d40",init:"RD",followers:"1.9M"},
  {id:11,name:"Raghuram Rajan",handle:"@RBI_RajanRG",plt:["x"],cat:"finance",flag:"🇮🇳",role:"Former RBI Governor",impact:85,avatar:"#1a5276",init:"RR",followers:"2.1M"},
  {id:12,name:"Uday Kotak",handle:"@udaykotak",plt:["x"],cat:"finance",flag:"🇮🇳",role:"Founder, Kotak Mahindra Bank",impact:82,avatar:"#f57f17",init:"UK",followers:"1.4M"},
  {id:13,name:"Nithin Kamath",handle:"@Nithin0dha",plt:["x"],cat:"fintech",flag:"🇮🇳",role:"CEO, Zerodha",impact:80,avatar:"#6a1b9a",init:"NK",followers:"893K"},
  {id:14,name:"Deepak Shenoy",handle:"@deepakshenoy",plt:["x"],cat:"finance",flag:"🇮🇳",role:"Founder, Capitalmind",impact:76,avatar:"#00695c",init:"DS",followers:"654K"},
  {id:15,name:"Basant Maheshwari",handle:"@BMTheEquityDesk",plt:["x"],cat:"investor",flag:"🇮🇳",role:"Founder, The Equity Desk",impact:74,avatar:"#e65100",init:"BM",followers:"521K"},
  {id:16,name:"Vijay Kedia",handle:"@VijayKedia007",plt:["x"],cat:"investor",flag:"🇮🇳",role:"Ace Indian Investor",impact:72,avatar:"#0277bd",init:"VK",followers:"412K"},
  {id:17,name:"Saurabh Mukherjea",handle:"@saurabh_mukherj",plt:["x"],cat:"finance",flag:"🇮🇳",role:"CEO, Marcellus Investment",impact:74,avatar:"#00838f",init:"SM",followers:"388K"},
  {id:18,name:"Raamdeo Agrawal",handle:"@RaamdeoMOFSL",plt:["x"],cat:"finance",flag:"🇮🇳",role:"Chairman, Motilal Oswal",impact:77,avatar:"#d84315",init:"RA",followers:"476K"},
  {id:19,name:"Shankar Sharma",handle:"@1stglobal_",plt:["x"],cat:"finance",flag:"🇮🇳",role:"Co-founder, First Global",impact:70,avatar:"#b71c1c",init:"SS",followers:"318K"},
  {id:20,name:"Nilesh Shah",handle:"@NileshShah68",plt:["x"],cat:"finance",flag:"🇮🇳",role:"MD, Kotak Mutual Fund",impact:74,avatar:"#4e342e",init:"NS",followers:"356K"},
  {id:21,name:"Larry Fink",handle:"@BlackRock",plt:["x","li"],cat:"finance",flag:"🇺🇸",role:"CEO, BlackRock",impact:86,avatar:"#1a237e",init:"LF",followers:"1.8M"},
  {id:22,name:"Jamie Dimon",handle:"@jpmorgan",plt:["x","li"],cat:"finance",flag:"🇺🇸",role:"CEO, JPMorgan Chase",impact:85,avatar:"#795548",init:"JD",followers:"1.2M"},
  {id:23,name:"Michael Burry",handle:"@michaeljburry",plt:["x"],cat:"investor",flag:"🇺🇸",role:"CIO, Scion Asset Management",impact:73,avatar:"#212121",init:"MB",followers:"742K"},
  {id:24,name:"George Soros",handle:"@georgesoros",plt:["x"],cat:"investor",flag:"🇺🇸",role:"Chairman, Open Society",impact:78,avatar:"#4a148c",init:"GS",followers:"623K"},
  {id:25,name:"Mohnish Pabrai",handle:"@MohnishPabrai",plt:["x"],cat:"investor",flag:"🇺🇸",role:"Founder, Pabrai Funds",impact:71,avatar:"#0b5345",init:"MP",followers:"289K"},
  {id:26,name:"Mohammed Bin Salman",handle:"@Vision2030",plt:["x"],cat:"political",flag:"🇸🇦",role:"Crown Prince, Saudi Arabia",impact:81,avatar:"#1b5e20",init:"MBS",followers:"5.2M"},
  {id:27,name:"Vladimir Putin",handle:"@KremlinRussia_E",plt:["x"],cat:"political",flag:"🇷🇺",role:"President, Russia",impact:86,avatar:"#c62828",init:"VP",followers:"4.7M"},
  {id:28,name:"Volodymyr Zelensky",handle:"@ZelenskyyUa",plt:["x"],cat:"political",flag:"🇺🇦",role:"President, Ukraine",impact:82,avatar:"#1565c0",init:"VZ",followers:"8.9M"},
  {id:29,name:"Benjamin Netanyahu",handle:"@IsraeliPM",plt:["x"],cat:"political",flag:"🇮🇱",role:"Prime Minister, Israel",impact:79,avatar:"#283593",init:"BN",followers:"3.6M"},
  {id:30,name:"Masayoshi Son",handle:"@masason",plt:["x"],cat:"investor",flag:"🇯🇵",role:"CEO, SoftBank Group",impact:78,avatar:"#c62828",init:"MS",followers:"1.4M"},
  {id:31,name:"Kristalina Georgieva",handle:"@KGeorgieva",plt:["x","li"],cat:"institution",flag:"🌐",role:"Managing Director, IMF",impact:83,avatar:"#6a1b9a",init:"KG",followers:"876K"},
  {id:32,name:"OPEC Secretary General",handle:"@OPECSecGen",plt:["x"],cat:"institution",flag:"🌐",role:"Sec-Gen, OPEC+",impact:81,avatar:"#e65100",init:"OPEC",followers:"562K"},
  {id:33,name:"Janet Yellen",handle:"@SecYellen",plt:["x"],cat:"financial",flag:"🇺🇸",role:"US Treasury Secretary",impact:87,avatar:"#880e4f",init:"JY",followers:"1.1M"},
  {id:34,name:"Sundar Pichai",handle:"@sundarpichai",plt:["x"],cat:"tech",flag:"🇺🇸",role:"CEO, Alphabet/Google",impact:76,avatar:"#1565c0",init:"SP",followers:"6.8M"},
  {id:35,name:"Satya Nadella",handle:"@satyanadella",plt:["x","li"],cat:"tech",flag:"🇺🇸",role:"CEO, Microsoft",impact:77,avatar:"#00695c",init:"SN",followers:"5.3M"},
  {id:36,name:"Mark Zuckerberg",handle:"@zuck",plt:["x"],cat:"tech",flag:"🇺🇸",role:"CEO, Meta",impact:75,avatar:"#1976d2",init:"MZ",followers:"12.1M"},
  {id:37,name:"RBI Governor",handle:"@RBI",plt:["x"],cat:"central_bank",flag:"🇮🇳",role:"Governor, Reserve Bank of India",impact:93,avatar:"#004d40",init:"RBI",followers:"3.4M"},
  {id:38,name:"SEBI Chairman",handle:"@SEBI_India",plt:["x"],cat:"regulatory",flag:"🇮🇳",role:"Chairman, SEBI",impact:89,avatar:"#1b5e20",init:"SEBI",followers:"2.8M"},
  {id:39,name:"N. Chandrasekaran",handle:"@nchandrasekaran",plt:["x","li"],cat:"corporate",flag:"🇮🇳",role:"Chairman, Tata Sons",impact:80,avatar:"#4527a0",init:"NC",followers:"678K"},
  {id:40,name:"Kumar Mangalam Birla",handle:"@AdityaBirla",plt:["x"],cat:"corporate",flag:"🇮🇳",role:"Chairman, Aditya Birla Group",impact:78,avatar:"#e64a19",init:"KB",followers:"542K"},
  {id:41,name:"Rahul Gandhi",handle:"@RahulGandhi",plt:["x"],cat:"political",flag:"🇮🇳",role:"Leader of Opposition, India",impact:73,avatar:"#880e4f",init:"RG",followers:"25.8M"},
  {id:42,name:"Arvind Kejriwal",handle:"@ArvindKejriwal",plt:["x"],cat:"political",flag:"🇮🇳",role:"AAP National Convenor",impact:69,avatar:"#0277bd",init:"AK",followers:"23.4M"},
  {id:43,name:"S. Naren",handle:"@s_naren",plt:["x"],cat:"finance",flag:"🇮🇳",role:"CIO, ICICI Prudential AMC",impact:73,avatar:"#2e7d32",init:"SN",followers:"298K"},
  {id:44,name:"Kenneth Andrade",handle:"@KennethAndrade",plt:["x"],cat:"finance",flag:"🇮🇳",role:"Founder, Old Bridge Capital",impact:70,avatar:"#4e342e",init:"KA",followers:"214K"},
  {id:45,name:"Prashant Jain",handle:"@PrashantJain3P",plt:["x"],cat:"finance",flag:"🇮🇳",role:"Founder, 3P Investment Managers",impact:72,avatar:"#37474f",init:"PJ",followers:"187K"},
  {id:46,name:"Klaus Schwab",handle:"@KlausSchwab",plt:["x"],cat:"institution",flag:"🌐",role:"Founder, World Economic Forum",impact:71,avatar:"#1a237e",init:"KS",followers:"492K"},
  {id:47,name:"Anand Mahindra",handle:"@anandmahindra",plt:["x"],cat:"corporate",flag:"🇮🇳",role:"Chairman, Mahindra Group",impact:79,avatar:"#c62828",init:"AM",followers:"11.2M"},
  {id:48,name:"Porinju Veliyath",handle:"@porinju",plt:["x"],cat:"investor",flag:"🇮🇳",role:"CEO, Equity Intelligence India",impact:68,avatar:"#6a1b9a",init:"PV",followers:"184K"},
  {id:49,name:"Ajay Bagga",handle:"@Ajay_Bagga",plt:["x"],cat:"finance",flag:"🇮🇳",role:"Market Strategist & Expert",impact:69,avatar:"#2e4057",init:"AB",followers:"156K"},
  {id:50,name:"Ashish Kacholia",handle:"@AshishKacholia",plt:["x"],cat:"investor",flag:"🇮🇳",role:"Ace Investor, Small-Cap Expert",impact:67,avatar:"#00695c",init:"AK",followers:"143K"},
];

/* ── POST TEMPLATES ─────────────────────────────────── */
const POST_POOL = [
  {txt:"🚨 Fed holds rates at {r}% — signals only {n} cut in 2025. Dollar strengthens. #{s} stocks under pressure. #Nifty support at {sp}",impact:"high",sent:"bearish",cats:["central_bank","finance","investor"]},
  {txt:"US 10Y yield spikes to {y}%. FII outflows from EM accelerating. India may see ₹{fi}cr selling today. Watch #Nifty50 {lv}",impact:"high",sent:"bearish",cats:["finance","central_bank"]},
  {txt:"BREAKING: Trump announces {t}% tariff on {g} imports. India {im} — #{sec} sector to watch closely 🇮🇳📊",impact:"high",sent:"bearish",cats:["political","corporate"]},
  {txt:"Russia-Ukraine ceasefire talks {st}. Risk appetite returning. Global equities rallying. #FII buying in India expected. #Nifty outlook positive ✅",impact:"high",sent:"bullish",cats:["political","investor"]},
  {txt:"OPEC+ extends {mb}mbpd cuts through Q{q}. Brent crude at ${c}/bbl. 🛢️ #OilIndia #ONGC under pressure. Watch current account deficit",impact:"high",sent:"bearish",cats:["institution","finance"]},
  {txt:"🇮🇳 RBI MPC DECISION: Repo rate {act} by {bp}bps to {rr}%. Stance {stance}. #BankNifty {ba} on liquidity news. FD rates to {fr}",impact:"very_high",sent:"bullish",cats:["central_bank","finance","fintech"]},
  {txt:"India CPI at {cpi}% vs est {ce}%. Core inflation cooling 📉 Rate cut probability rises to {rcp}%. Bullish for rate-sensitive sectors #Nifty",impact:"high",sent:"bullish",cats:["finance","central_bank","investor"]},
  {txt:"Q{q}FY25 GDP: India grows at {g}% — beats est {ge}%. Fastest growing major economy 🚀 #Nifty re-rating possible. {sec} sector leading",impact:"high",sent:"bullish",cats:["political","finance","corporate"]},
  {txt:"FII net BUY: ₹{fi}cr in equities today. DII add ₹{di}cr. Rotation into {sec}. #Nifty {act} likely at open — {lv} target",impact:"medium",sent:"bullish",cats:["finance","investor","fintech"]},
  {txt:"FII SOLD ₹{fi}cr today. Rupee weak at {usd}/USD. RBI intervening. #Nifty put writing at {st}. #BankNifty under pressure",impact:"medium",sent:"bearish",cats:["finance","investor"]},
  {txt:"China stimulus package $1.{n}T announced. EM risk-on 🟢 India may see {fi}cr FII inflows this week. Metal & infra stocks to move",impact:"medium",sent:"bullish",cats:["political","investor","finance"]},
  {txt:"Middle East tensions escalating near {loc}. Crude spiking ${s}. India imports 85% oil — CAD concerns. #Nifty resistance {r}",impact:"high",sent:"bearish",cats:["political","institution"]},
  {txt:"SEBI new circular: F&O position limits tightened. Weekly expiry changes. Option writers note: margin requirements up {p}% 📋 #SEBI #FnO",impact:"high",sent:"neutral",cats:["regulatory","fintech","finance"]},
  {txt:"Budget 2026 highlights: Capital gains tax {cgt}. STT {stt}. Infrastructure allocation ₹{inf}L cr. #Nifty {ba} on budget proposals 🇮🇳",impact:"very_high",sent:"bullish",cats:["political","finance"]},
  {txt:"Japan BOJ {act} rates. Yen {ya}. Carry trade unwind risk. EM selloff possible if Nikkei drops. Watch #Nifty correlation 🇯🇵",impact:"high",sent:"bearish",cats:["central_bank","investor","finance"]},
  {txt:"#Nifty50 max pain at {mp}. PCR ratio {pcr} — {pcs}. Significant call writing at {cs}. Put support at {ps}. IV at {iv}% 📊",impact:"medium",sent:"neutral",cats:["fintech","finance","investor"]},
  {txt:"GIFT Nifty indicating {gi} open ({gp} pts). SGX Nifty tracking US cues 🌐 Key levels: Resistance {r} | Support {s} for today",impact:"medium",sent:"bullish",cats:["finance","investor","fintech"]},
  {txt:"Dollar Index (DXY) at {dxy}. USDINR {usd}. RBI sold ${rb}Bn in forex market to defend rupee. Watch Nifty correlations",impact:"medium",sent:"bearish",cats:["central_bank","finance"]},
  {txt:"Reliance Q{q} results: Revenue {rr}%, PAT {pp}%. Jio ARPU ₹{ar}. Green energy capex ₹{gc}cr. Stock {sa} — largest Nifty weight 💚",impact:"high",sent:"bullish",cats:["corporate","investor"]},
  {txt:"HDFC Bank NPA {np}% — {npa}. Net Interest Margin {nim}%. Best-in-class metrics 💪 #BankNifty strength hinges on HDFC performance",impact:"high",sent:"bullish",cats:["finance","investor","corporate"]},
  {txt:"IT sector warning: US spending cuts impacting TCS/Infy deal pipeline. {pc}% revenue miss risk in Q{q}. #Nifty IT index watch ⚠️",impact:"high",sent:"bearish",cats:["tech","corporate","finance"]},
  {txt:"Gold hits ${g}/oz as safe haven demand surges. MCX Gold ₹{mg}/10g. Equity market risk-off. #Nifty may test {nt} support",impact:"medium",sent:"bearish",cats:["investor","finance"]},
  {txt:"PSU Banks rally — government capex push. SBI, PNB, Canara outperforming. #BankNifty outperforming #PrivateBanks. {sent} for #Nifty",impact:"medium",sent:"bullish",cats:["finance","political","corporate"]},
  {txt:"US-India trade deal progress: {sec} sector gets MFN status. Pharma exports to get {p}% duty relief. Bullish India🇮🇳-USA🇺🇸 relations 🤝",impact:"high",sent:"bullish",cats:["political","corporate","finance"]},
  {txt:"Electric vehicle push: India announces {sub}% EV subsidy extension. #Tata Motors #M&M beneficiaries. #Nifty Auto index target {t}",impact:"medium",sent:"bullish",cats:["corporate","political","tech"]},
  {txt:"Semiconductor PLI: India attracts {amt}Bn investment. {co} sets up chip fab. #Nifty midcap tech to benefit long term 🔧",impact:"medium",sent:"bullish",cats:["tech","political","corporate"]},
  {txt:"Inflation in Eurozone: {ei}%. ECB signals {es}. Euro weakness = Dollar strength = EM pressure. India may see {fi}cr FII outflow",impact:"medium",sent:"bearish",cats:["central_bank","finance"]},
  {txt:"Pakistan economy crisis deepens. Geopolitical risk elevated at India border. Defense stocks #HAL #BEL may see institutional buying",impact:"medium",sent:"neutral",cats:["political","investor"]},
  {txt:"MSCI rebalancing: India weight increases to {mw}%. Passive inflows of ${pa}Mn expected. #Nifty re-rating potential over next quarter 📈",impact:"high",sent:"bullish",cats:["finance","investor"]},
  {txt:"Crude inventory data: US draws {ud}Mn barrels. Brent {ba}. #OMCs Nifty constituents — BPCL, IOC watch this closely. IEA report today",impact:"medium",sent:"bullish",cats:["institution","investor","corporate"]},
  {txt:"SIP inflows hit ₹{sip}cr — new all-time high. Retail participation strong 💪 Domestic liquidity supporting #Nifty dips. Long-term bullish",impact:"medium",sent:"bullish",cats:["fintech","finance","investor"]},
  {txt:"Xi Jinping meets Modi. India-China {rel}. Boundary friction {fr}. Trade {tr}Bn. Markets watching for any strategic realignment 🌏",impact:"high",sent:"neutral",cats:["political","corporate"]},
  {txt:"Israel-Gaza ceasefire {cfs}. Crude drops ${cd}/bbl instantly. #OMCs rally. India current account pressure eases. #Nifty positive",impact:"high",sent:"bullish",cats:["political","finance","investor"]},
  {txt:"AI boom: Indian IT firms pivot to GenAI services. {co} signs ${deal}Bn AI deal. Tier-2 IT stocks watching closely 🤖 #Nifty IT",impact:"medium",sent:"bullish",cats:["tech","corporate","investor"]},
  {txt:"BlackRock increases India allocation to {ba}%. {amt}Mn USD deployed in Indian equities. #Nifty foreign confidence indicator 🌐",impact:"medium",sent:"bullish",cats:["finance","investor"]},
];

/* Fill template placeholders */
function fillTemplate(t) {
  const rand = (a,b) => (Math.random()*(b-a)+a).toFixed(1)*1;
  const pick = arr => arr[Math.floor(Math.random()*arr.length)];
  return t
    .replace(/{r}/g, pick(["5.25","5.50","4.75","5.00"]))
    .replace(/{n}/g, pick(["1","2","3"]))
    .replace(/{s}/g, pick(["IT","FMCG","Auto","Pharma","Metal","Banking","Infra"]))
    .replace(/{sp}/g, (22000+Math.round(rand(-500,500)/50)*50).toString())
    .replace(/{y}/g, rand(4.0,5.2).toFixed(2))
    .replace(/{fi}/g, (Math.round(rand(1000,9000)/100)*100).toString())
    .replace(/{lv}/g, (22000+Math.round(rand(-600,600)/50)*50).toString())
    .replace(/{t}/g, pick(["10","15","25","20"]))
    .replace(/{g}/g, pick(["Chinese","European","steel","solar panel","EV"]))
    .replace(/{im}/g, pick(["exempt","minor impact","benefit"]))
    .replace(/{sec}/g, pick(["IT","Pharma","Auto","Metal","FMCG","Infra","Banking","Textile"]))
    .replace(/{st}/g, pick(["ongoing","stalled","breakthrough seen","collapsed"]))
    .replace(/{mb}/g, pick(["1.2","2.0","1.5","0.8"]))
    .replace(/{q}/g, pick(["1","2","3","4"]))
    .replace(/{c}/g, (Math.round(rand(75,95))).toString())
    .replace(/{act}/g, pick(["cut","hold","hike"]))
    .replace(/{bp}/g, pick(["25","50","35"]))
    .replace(/{rr}/g, pick(["6.25","6.00","6.50","5.75"]))
    .replace(/{stance}/g, pick(["accommodative","neutral","withdrawal of accommodation"]))
    .replace(/{ba}/g, pick(["surges","jumps","rallies","dips","falls"]))
    .replace(/{fr}/g, pick(["cuts rates","raises FDs","NIM pressure"]))
    .replace(/{cpi}/g, rand(3.8,5.9).toFixed(1))
    .replace(/{ce}/g, rand(4.0,5.5).toFixed(1))
    .replace(/{rcp}/g, pick(["45","60","70","35"]))
    .replace(/{ge}/g, rand(6.5,7.5).toFixed(1))
    .replace(/{di}/g, (Math.round(rand(800,4000)/100)*100).toString())
    .replace(/{usd}/g, rand(84,87).toFixed(2))
    .replace(/{loc}/g, pick(["Strait of Hormuz","Red Sea","Suez Canal","Persian Gulf"]))
    .replace(/{cgt}/g, pick(["unchanged","rationalized","revised upward"]))
    .replace(/{stt}/g, pick(["revised","unchanged","increased"]))
    .replace(/{inf}/g, pick(["11","13","15","10"]))
    .replace(/{ya}/g, pick(["strengthens","weakens sharply","volatile"]))
    .replace(/{mp}/g, (22000+Math.round(rand(-500,500)/100)*100).toString())
    .replace(/{pcr}/g, rand(0.6,1.4).toFixed(2))
    .replace(/{pcs}/g, pick(["mildly bullish","bearish","neutral","put heavy"]))
    .replace(/{cs}/g, (22000+Math.round(rand(100,600)/100)*100).toString())
    .replace(/{ps}/g, (22000+Math.round(rand(-600,-100)/100)*100).toString())
    .replace(/{iv}/g, Math.round(rand(14,22)).toString())
    .replace(/{gi}/g, pick(["flat","gap up","gap down"]))
    .replace(/{gp}/g, Math.round(rand(-120,120)).toString())
    .replace(/{rb}/g, rand(1,4).toFixed(1))
    .replace(/{dxy}/g, rand(102,108).toFixed(1))
    .replace(/{rp}/g, rand(84,87).toFixed(2))
    .replace(/{rr}/g, pick(["beats","miss","in-line"]))
    .replace(/{pp}/g, pick(["+12%","+8%","+18%","-5%"]))
    .replace(/{ar}/g, Math.round(rand(180,220)).toString())
    .replace(/{gc}/g, Math.round(rand(5000,15000)/1000)*1000)
    .replace(/{sa}/g, pick(["up 2%","down 1%","flat","up 3%"]))
    .replace(/{np}/g, rand(1.2,2.5).toFixed(1))
    .replace(/{npa}/g, pick(["improving","stable","slight uptick"]))
    .replace(/{nim}/g, rand(3.5,4.5).toFixed(1))
    .replace(/{pc}/g, Math.round(rand(3,8)).toString())
    .replace(/{mg}/g, Math.round(rand(72000,88000)/1000)*1000)
    .replace(/{nt}/g, (22000+Math.round(rand(-800,-200)/100)*100).toString())
    .replace(/{sent}/g, pick(["Positive","Neutral","Mixed"]))
    .replace(/{p}/g, Math.round(rand(10,30)).toString())
    .replace(/{sub}/g, Math.round(rand(15,40)).toString())
    .replace(/{amt}/g, Math.round(rand(2,15)).toString())
    .replace(/{co}/g, pick(["NVIDIA","Samsung","Intel","Micron","TSMC","Foxconn"]))
    .replace(/{ei}/g, rand(2.0,4.5).toFixed(1))
    .replace(/{es}/g, pick(["rate cut","rate hold","further tightening"]))
    .replace(/{mw}/g, rand(17,22).toFixed(1))
    .replace(/{pa}/g, Math.round(rand(800,4000)).toString())
    .replace(/{ud}/g, rand(1,8).toFixed(1))
    .replace(/{sip}/g, Math.round(rand(18000,27000)/100)*100)
    .replace(/{rel}/g, pick(["normalizing","tense","improving","frosty"]))
    .replace(/{tr}/g, Math.round(rand(80,150)).toString())
    .replace(/{cfs}/g, pick(["agreed","collapses","extended","holds"]))
    .replace(/{cd}/g, Math.round(rand(2,8)).toString())
    .replace(/{deal}/g, Math.round(rand(1,9)).toString())
    .replace(/{bf}/g, rand(7.0,13.0).toFixed(1))
    .replace(/{bf}/g, rand(7.0,13.0).toFixed(1))
    .replace(/{r}/g, (22000+Math.round(rand(200,600)/100)*100).toString())
    .replace(/{nt}/g, (22000+Math.round(rand(-400,400)/100)*100).toString())
    .replace(/{gp}/g, Math.round(rand(-80,80)).toString())
    .replace(/{g}/g, rand(6.8,7.8).toFixed(1))
    .replace(/{g}/g, Math.round(rand(2800,3200)).toString());
}

/* Format post content with highlights */
function formatPostBody(txt) {
  return txt
    .replace(/#(\w+)/g,'<span class="ht">#$1</span>')
    .replace(/\$([A-Z]+)/g,'<span class="ct">$$$1</span>')
    .replace(/([🚨✅📊📉📈🛢️⚠️🤝🌐🇮🇳🇺🇸🇷🇺🇺🇦🌏🤖🔧💪🚀💚🇯🇵])/g,'<span class="em">$1</span>');
}

/* Time labels */
function timeAgo(ts) {
  const diff = (Date.now()-ts)/1000;
  if(diff<60) return `${Math.round(diff)}s ago`;
  if(diff<3600) return `${Math.round(diff/60)}m ago`;
  return `${Math.round(diff/3600)}h ago`;
}

function fmtIST() {
  return new Date().toLocaleString('en-IN',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false});
}

function isMarketOpen() {
  const now = new Date();
  const ist = new Date(now.toLocaleString('en-US',{timeZone:'Asia/Kolkata'}));
  const h = ist.getHours(), m = ist.getMinutes(), day = ist.getDay();
  if(day===0||day===6) return false;
  const mins = h*60+m;
  return mins>=555 && mins<=930; // 9:15 to 15:30
}

/* ── NIFTY PRICE ENGINE ────────────────────────────── */
const NiftyEngine = {
  base: 22478.50,
  current: 22478.50,
  prevClose: 22312.30,
  open: 22401.20,
  high: 22541.80,
  low: 22298.45,
  volume: 0,
  priceHistory: [],
  chart: null,
  seriesCandle: null,
  seriesVolume: null,

  init() {
    this.current = this.base + (Math.random()-0.5)*200;
    this.generateHistory();
  },

  generateHistory() {
    const bars = 270;
    let price = this.prevClose;
    const baseTime = new Date();
    baseTime.setHours(9,15,0,0);
    const ist = new Date(baseTime.toLocaleString('en-US',{timeZone:'Asia/Kolkata'}));
    for(let i=0;i<bars;i++) {
      const open = price;
      const drift = (Math.random()-0.495)*0.0018*price;
      const noise = (Math.random()-0.5)*0.0012*price;
      const close = open + drift + noise;
      const hl = Math.abs(drift+noise)*1.8;
      const high = Math.max(open,close)+Math.random()*hl;
      const low = Math.min(open,close)-Math.random()*hl;
      const t = Math.floor((ist.getTime()+i*60000)/1000);
      this.priceHistory.push({time:t,open:+open.toFixed(2),high:+high.toFixed(2),low:+low.toFixed(2),close:+close.toFixed(2),volume:Math.round(Math.random()*800000+200000)});
      price = close;
    }
    this.current = price;
    this.high = Math.max(...this.priceHistory.map(b=>b.high));
    this.low = Math.min(...this.priceHistory.map(b=>b.low));
    this.open = this.priceHistory[0]?.open||this.prevClose;
  },

  tick() {
    const volatility = 0.0015;
    const change = (Math.random()-0.495)*volatility*this.current;
    this.current = Math.max(this.current+change, this.prevClose*0.92);
    this.high = Math.max(this.high, this.current);
    this.low = Math.min(this.low, this.current);
    this.volume += Math.round(Math.random()*50000+10000);
    const last = this.priceHistory[this.priceHistory.length-1];
    const nowT = Math.floor(Date.now()/1000);
    if(last && nowT-last.time < 60) {
      last.close = +this.current.toFixed(2);
      last.high = Math.max(last.high,last.close);
      last.low = Math.min(last.low,last.close);
      last.volume += 5000;
      if(this.seriesCandle) this.seriesCandle.update(last);
    } else {
      const bar = {time:nowT,open:+this.current.toFixed(2),high:+this.current.toFixed(2),low:+this.current.toFixed(2),close:+this.current.toFixed(2),volume:Math.round(Math.random()*300000+50000)};
      this.priceHistory.push(bar);
      if(this.seriesCandle) this.seriesCandle.update(bar);
    }
    return this.current;
  },

  getChange() { return this.current - this.prevClose; },
  getChangePct() { return ((this.current-this.prevClose)/this.prevClose)*100; },
};

/* ── BANKNIFTY ENGINE ──────────────────────────────── */
const BankNiftyEngine = {
  current: 48234.70,
  prevClose: 47892.30,
  tick() {
    this.current += (Math.random()-0.495)*0.002*this.current;
    return this.current;
  },
  getChange() { return this.current-this.prevClose; },
  getChangePct() { return ((this.current-this.prevClose)/this.prevClose)*100; },
};

/* ── OPTIONS CHAIN ENGINE ──────────────────────────── */
const OptionsEngine = {
  getATM(spot) { return Math.round(spot/100)*100; },

  getPrice(spot,strike,type,iv=0.18,T=7/365,r=0.065) {
    const S=spot,K=strike,sigma=iv;
    const d1=(Math.log(S/K)+(r+0.5*sigma*sigma)*T)/(sigma*Math.sqrt(T));
    const d2=d1-sigma*Math.sqrt(T);
    const N=(x)=>0.5*(1+this.erf(x/Math.sqrt(2)));
    if(type==='call') return Math.max(0,S*N(d1)-K*Math.exp(-r*T)*N(d2));
    else return Math.max(0,K*Math.exp(-r*T)*N(-d2)-S*N(-d1));
  },

  erf(x) {
    const t=1/(1+0.3275911*Math.abs(x));
    const y=1-((((1.061405429*t-1.453152027)*t)+1.421413741)*t-0.284496736)*t*0.254829592*Math.exp(-x*x);
    return x<0?-y:y;
  },

  getIV(spot,strike,T=7/365) {
    const moneyness = Math.abs(spot-strike)/spot;
    const baseIV = 0.175;
    return baseIV + moneyness*0.8 + (Math.random()-0.5)*0.01;
  },

  getOI(strike,atm,type) {
    const dist = Math.abs(strike-atm);
    const base = type==='call' ? Math.max(0,600000-dist*800) : Math.max(0,600000-dist*700);
    return Math.round(base*(0.7+Math.random()*0.6)/100)*100;
  },

  buildChain(spot, strikes=20) {
    const atm = this.getATM(spot);
    const chain = [];
    for(let i=-strikes/2;i<=strikes/2;i++) {
      const strike = atm + i*100;
      const T = 6/365;
      const callIV = this.getIV(spot,strike,T);
      const putIV = this.getIV(spot,strike,T);
      const callPrice = +this.getPrice(spot,strike,'call',callIV,T).toFixed(2);
      const putPrice = +this.getPrice(spot,strike,'put',putIV,T).toFixed(2);
      const callOI = this.getOI(strike,atm,'call');
      const putOI = this.getOI(strike,atm,'put');
      chain.push({
        strike,
        callPrice,callIV:+(callIV*100).toFixed(1),callOI,callVol:Math.round(callOI*0.35),
        callDelta:+(strike<=spot?0.5+Math.random()*0.4:0.5-Math.random()*0.4).toFixed(2),
        putPrice,putIV:+(putIV*100).toFixed(1),putOI,putVol:Math.round(putOI*0.32),
        putDelta:+(strike<=spot?-0.5+Math.random()*0.4:-(0.5-Math.random()*0.4)).toFixed(2),
        isATM: strike===atm,
        isITMCall: strike<spot,
        isITMPut: strike>spot,
      });
    }
    return chain;
  },

  getPCR(chain) {
    const totalPutOI = chain.reduce((a,c)=>a+c.putOI,0);
    const totalCallOI = chain.reduce((a,c)=>a+c.callOI,0);
    return +(totalPutOI/totalCallOI).toFixed(2);
  },

  getMaxPain(chain) {
    let minPain = Infinity, maxPain = chain[0].strike;
    chain.forEach(row=>{
      let pain = 0;
      chain.forEach(r2=>{
        pain += r2.callOI*Math.max(0,r2.strike-row.strike);
        pain += r2.putOI*Math.max(0,row.strike-r2.strike);
      });
      if(pain<minPain){minPain=pain;maxPain=row.strike;}
    });
    return maxPain;
  },
};

/* ── TECHNICAL ANALYSIS ENGINE ─────────────────────── */
const TechEngine = {
  ema(vals, n) {
    if(vals.length<n) return vals[vals.length-1]||0;
    const k=2/(n+1); let e=vals.slice(0,n).reduce((a,b)=>a+b,0)/n;
    for(let i=n;i<vals.length;i++) e=vals[i]*k+e*(1-k);
    return +e.toFixed(2);
  },
  rsi(vals, n=14) {
    if(vals.length<n+2) return 50;
    let g=0,l=0;
    for(let i=vals.length-n;i<vals.length;i++){const d=vals[i]-vals[i-1];if(d>0)g+=d;else l-=d;}
    const rs=(g/n)/((l/n)||.001);
    return +(100-100/(1+rs)).toFixed(1);
  },
  macd(vals) {
    if(vals.length<30) return {line:0,sig:0,hist:0};
    const e12=this.ema(vals,12), e26=this.ema(vals,26);
    // Compute proper signal line as 9-EMA of MACD values over last 20 bars
    const macdSeries = [];
    for(let i=Math.max(26,vals.length-35);i<vals.length;i++){
      const sub=vals.slice(0,i+1);
      macdSeries.push(this.ema(sub,12)-this.ema(sub,26));
    }
    const line=+(e12-e26).toFixed(2);
    const sigLine=+this.ema(macdSeries,9).toFixed(2);
    return {line, sig:sigLine, hist:+(line-sigLine).toFixed(2)};
  },
  bb(vals, n=20, m=2) {
    const s=vals.slice(-n);
    if(s.length<n) return {upper:vals[vals.length-1]*1.02,middle:vals[vals.length-1],lower:vals[vals.length-1]*.98,pct:50,width:2};
    const avg=s.reduce((a,b)=>a+b,0)/n;
    const std=Math.sqrt(s.reduce((a,b)=>a+(b-avg)**2,0)/n);
    const upper=+(avg+m*std).toFixed(2), lower=+(avg-m*std).toFixed(2);
    const cur=vals[vals.length-1];
    const pct=+((cur-lower)/(upper-lower||1)*100).toFixed(1);
    return {upper, middle:+avg.toFixed(2), lower, std, pct, width:+(2*m*std/avg*100).toFixed(2)};
  },
  vwap(bars) {
    const sl=bars.slice(-200);
    const sv=sl.reduce((a,b)=>a+b.volume,0)||1;
    return +(sl.reduce((a,b)=>a+(b.close+b.high+b.low)/3*b.volume,0)/sv).toFixed(2);
  },
  stoch(bars, k=14) {
    const sl=bars.slice(-k); if(!sl.length) return 50;
    const hi=Math.max(...sl.map(b=>b.high)), lo=Math.min(...sl.map(b=>b.low));
    return +((bars[bars.length-1]?.close-lo)/(hi-lo||1)*100).toFixed(1);
  },
  adx(bars, n=14) {
    if(bars.length<n+2) return {adx:20, diP:15, diM:15};
    let tr=0,dmp=0,dmm=0;
    for(let i=bars.length-n;i<bars.length;i++){
      const {high:h,low:l,close:c}=bars[i], {high:ph,low:pl,close:pc}=bars[i-1];
      tr+=Math.max(h-l,Math.abs(h-pc),Math.abs(l-pc));
      const p=Math.max(0,h-ph), mm=Math.max(0,pl-l);
      dmp+=p>mm?p:0; dmm+=mm>p?mm:0;
    }
    if(!tr) return {adx:20, diP:15, diM:15};
    const diP=+(100*dmp/tr).toFixed(1), diM=+(100*dmm/tr).toFixed(1);
    return {adx:+(100*Math.abs(diP-diM)/(diP+diM||1)).toFixed(1), diP, diM};
  },
  oi_levels(spot, chain) {
    const below=chain.filter(r=>r.strike<spot).sort((a,b)=>b.putOI-a.putOI);
    const above=chain.filter(r=>r.strike>spot).sort((a,b)=>b.callOI-a.callOI);
    return {
      s1: below[0]?.strike||spot-100,  s2: below[1]?.strike||spot-200,
      r1: above[0]?.strike||spot+100,  r2: above[1]?.strike||spot+200,
    };
  },
  compute(bars) {
    const cls=bars.map(b=>b.close);
    return {
      rsi: this.rsi(cls), ema9: this.ema(cls,9), ema20: this.ema(cls,20), ema50: this.ema(cls,50),
      macd: this.macd(cls), bb: this.bb(cls), vwap: this.vwap(bars),
      stoch: this.stoch(bars), adx: this.adx(bars),
    };
  }
};

/* ── MULTI-FACTOR SIGNAL ENGINE (10 indicators, weighted) ─ */
const SignalEngine = {
  current:{signal:'HOLD',strength:5,confidence:50,indicators:[],bullScore:0,bearScore:0},
  history:[],

  eval(spot, tech, pcr, maxPain, geoScore) {
    const inds=[]; let bull=0, bear=0;
    const add=(name,val,s,str,reason,color)=>{
      inds.push({name,val,s,str,reason,c:color});
      if(s==='BUY') bull+=str; else if(s==='SELL') bear+=str;
    };

    /* 1 ── RSI  (max 15) */
    const r=tech.rsi;
    if(r<25)      add('RSI',r,'BUY',15,`RSI ${r} — OVERSOLD 🔥 strong buy zone`,'green');
    else if(r>75) add('RSI',r,'SELL',15,`RSI ${r} — OVERBOUGHT ⚡ overextended`,'red');
    else if(r<40) add('RSI',r,'BUY',8,`RSI ${r} — bearish zone, recovery possible`,'green');
    else if(r>60) add('RSI',r,'BUY',8,`RSI ${r} — bullish momentum building`,'green');
    else          add('RSI',r,'HOLD',0,`RSI ${r} — neutral zone`,'yellow');

    /* 2 ── MACD  (max 20) */
    const {line:ml,hist:mh}=tech.macd;
    if(mh>0&&ml>0)  add('MACD',`+${ml}`,'BUY',20,`MACD +${ml} bull crossover ✅ strong momentum`,'green');
    else if(mh<0&&ml<0) add('MACD',ml,'SELL',20,`MACD ${ml} bear crossover ⬇️ sell pressure`,'red');
    else if(mh>0)   add('MACD',ml,'BUY',10,`MACD hist turning +ve — momentum rising`,'green');
    else            add('MACD',ml,'SELL',10,`MACD hist turning -ve — momentum fading`,'red');

    /* 3 ── EMA alignment  (max 15) */
    const {ema9:e9,ema20:e20}=tech;
    if(spot>e9&&e9>e20)   add('EMA',`▲${e9.toFixed(0)}`,'BUY',15,`Price(${spot.toFixed(0)})>EMA9(${e9})>EMA20(${e20}) — perfect uptrend`,'green');
    else if(spot<e9&&e9<e20) add('EMA',`▼${e9.toFixed(0)}`,'SELL',15,`Price<EMA9<EMA20(${e20}) — downtrend aligned`,'red');
    else if(spot>e20)     add('EMA',`▲${e9.toFixed(0)}`,'BUY',7,`Above EMA20(${e20}) — mild bullish bias`,'green');
    else                  add('EMA',`▼${e9.toFixed(0)}`,'SELL',7,`Below EMA20(${e20}) — mild bearish bias`,'red');

    /* 4 ── Bollinger Bands  (max 12) */
    const {upper:bu,lower:bl,pct:bp}=tech.bb;
    if(spot<bl)    add('BB',`${bp}%`,'BUY',12,`Price below lower BB(${bl}) — mean reversion BUY`,'green');
    else if(spot>bu) add('BB',`${bp}%`,'SELL',12,`Price above upper BB(${bu}) — mean reversion SELL`,'red');
    else if(bp<25) add('BB',`${bp}%`,'BUY',6,`Near lower BB — ${bp}% of band, oversold`,'green');
    else if(bp>75) add('BB',`${bp}%`,'SELL',6,`Near upper BB — ${bp}% of band, overbought`,'red');
    else           add('BB',`${bp}%`,'HOLD',0,`Mid Bollinger (${bp}%) — width ${tech.bb.width}%`,'yellow');

    /* 5 ── VWAP  (max 10) */
    const vd=+((spot-tech.vwap)/tech.vwap*100).toFixed(2);
    if(vd>0.35)     add('VWAP',tech.vwap.toFixed(0),'BUY',10,`+${vd}% above VWAP(${tech.vwap}) — institutional buying`,'green');
    else if(vd<-0.35) add('VWAP',tech.vwap.toFixed(0),'SELL',10,`${vd}% below VWAP(${tech.vwap}) — distribution`,'red');
    else            add('VWAP',tech.vwap.toFixed(0),'HOLD',0,`Near VWAP(${tech.vwap}) — balance zone`,'yellow');

    /* 6 ── ADX trend strength  (max 10) */
    const {adx:ax,diP,diM}=tech.adx;
    if(ax>28&&diP>diM)  add('ADX',ax,'BUY',10,`ADX ${ax} strong uptrend | DI+ ${diP} > DI- ${diM}`,'green');
    else if(ax>28&&diM>diP) add('ADX',ax,'SELL',10,`ADX ${ax} strong downtrend | DI- ${diM} > DI+ ${diP}`,'red');
    else if(ax>20&&diP>diM) add('ADX',ax,'BUY',5,`ADX ${ax} moderate uptrend forming`,'green');
    else if(ax>20&&diM>diP) add('ADX',ax,'SELL',5,`ADX ${ax} moderate downtrend`,'red');
    else                add('ADX',ax,'HOLD',0,`ADX ${ax} — weak/sideways trend`,'yellow');

    /* 7 ── Stochastic  (max 8) */
    const sk=tech.stoch;
    if(sk<20)  add('Stoch',`${sk}%`,'BUY',8,`Stoch ${sk}% — oversold rebound likely`,'green');
    else if(sk>80) add('Stoch',`${sk}%`,'SELL',8,`Stoch ${sk}% — overbought reversal risk`,'red');
    else if(sk<35) add('Stoch',`${sk}%`,'BUY',4,`Stoch ${sk}% — trending from oversold`,'green');
    else if(sk>65) add('Stoch',`${sk}%`,'SELL',4,`Stoch ${sk}% — approaching overbought`,'red');
    else       add('Stoch',`${sk}%`,'HOLD',0,`Stoch ${sk}% — neutral range`,'yellow');

    /* 8 ── PCR (options market sentiment)  (max 15) */
    const pcrV=+pcr;
    if(pcrV>1.4)      add('PCR',pcrV,'BUY',15,`PCR ${pcrV} — heavy put buying = market floor building 🛡`,'green');
    else if(pcrV<0.6) add('PCR',pcrV,'SELL',15,`PCR ${pcrV} — call overload = bearish positioning ⚠️`,'red');
    else if(pcrV>1.15) add('PCR',pcrV,'BUY',8,`PCR ${pcrV} — mild put bias = slight bullish`,'green');
    else if(pcrV<0.85) add('PCR',pcrV,'SELL',8,`PCR ${pcrV} — mild call bias = slight bearish`,'red');
    else               add('PCR',pcrV,'HOLD',0,`PCR ${pcrV} — balanced OI structure`,'yellow');

    /* 9 ── Geo-Social Sentiment  (max 15) */
    const gs=geoScore;
    if(gs>=68)      add('GeoAI',`${gs}%`,'BUY',15,`Geo-sentiment ${gs}% — strongly bullish macro 🌏`,'green');
    else if(gs<=32) add('GeoAI',`${gs}%`,'SELL',15,`Geo-sentiment ${gs}% — strongly bearish macro 🌍`,'red');
    else if(gs>=55) add('GeoAI',`${gs}%`,'BUY',8,`Geo-sentiment ${gs}% — mildly bullish`,'green');
    else if(gs<=45) add('GeoAI',`${gs}%`,'SELL',8,`Geo-sentiment ${gs}% — mildly bearish`,'red');
    else            add('GeoAI',`${gs}%`,'HOLD',0,`Geo-sentiment ${gs}% — neutral`,'yellow');

    /* 10 ── Max Pain Gravity  (max 10) */
    const mpd=+(spot-maxPain).toFixed(0);
    if(Math.abs(mpd)<40)   add('MaxPain',maxPain,'HOLD',0,`At Max Pain ${maxPain} — pinning likely on expiry`,'yellow');
    else if(mpd>200)       add('MaxPain',maxPain,'SELL',10,`${mpd}pts ABOVE Max Pain — strong gravity pull down`,'red');
    else if(mpd<-200)      add('MaxPain',maxPain,'BUY',10,`${Math.abs(mpd)}pts BELOW Max Pain — gravity pull up`,'green');
    else if(mpd>0)         add('MaxPain',maxPain,'SELL',5,`${mpd}pts above MaxPain ${maxPain} — mild pull down`,'red');
    else                   add('MaxPain',maxPain,'BUY',5,`${Math.abs(mpd)}pts below MaxPain ${maxPain} — mild pull up`,'green');

    /* ── FINAL SCORE ── */
    const total=bull+bear||1, net=bull-bear;
    const rawStr=Math.abs(net)/total;
    const strength=Math.min(10,Math.ceil(rawStr*11));
    const signal=bull>bear+18?'BUY':bear>bull+18?'SELL':'HOLD';
    const confidence=Math.min(95,Math.round(50+rawStr*48));
    const result={signal,strength,confidence,indicators:inds,bullScore:bull,bearScore:bear};

    /* record history on signal change */
    if(this.current.signal!==signal&&strength>=6){
      this.history.unshift({...result,spot:spot.toFixed(0),
        time:new Date().toLocaleTimeString('en-IN',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit'})});
      if(this.history.length>6) this.history.pop();
    }
    this.current=result;
    return result;
  }
};

/* ── AI SENTIMENT ENGINE ───────────────────────────── */
const AIEngine = {
  score: 62,
  bullCount: 0,
  bearCount: 0,
  neuCount: 0,
  recommendation: {type:'CALL',strike:22500,expiry:'27 Mar',confidence:71},
  posts: [],

  updateSentiment(posts) {
    let b=0,be=0,n=0;
    posts.slice(0,30).forEach(p=>{
      if(p.sent==='bullish')b++;
      else if(p.sent==='bearish')be++;
      else n++;
    });
    const total=b+be+n||1;
    this.score = Math.round((b/total)*100);
    this.bullCount=b;this.bearCount=be;this.neuCount=n;
    this.posts=posts;
    this.updateRecommendation();
  },

  updateRecommendation() {
    const spot = NiftyEngine.current;
    const atm = OptionsEngine.getATM(spot);
    if(this.score>=60){
      this.recommendation={type:'CALL',strike:atm+100,expiry:'27 Mar',confidence:this.score,premium:null};
    } else if(this.score<=40){
      this.recommendation={type:'PUT',strike:atm-100,expiry:'27 Mar',confidence:100-this.score,premium:null};
    } else {
      this.recommendation={type:'STRADDLE',strike:atm,expiry:'27 Mar',confidence:55,premium:null};
    }
    const chain = OptionsEngine.buildChain(spot,4);
    const row = chain.find(r=>r.strike===this.recommendation.strike)||chain[2];
    if(row) this.recommendation.premium = this.recommendation.type==='CALL'?row.callPrice:row.putPrice;
  },

  getSentimentColor() {
    if(this.score>=60) return 'var(--green)';
    if(this.score<=40) return 'var(--red)';
    return 'var(--orange)';
  },

  getSentimentLabel() {
    if(this.score>=70) return 'STRONGLY BULLISH';
    if(this.score>=60) return 'BULLISH';
    if(this.score>=50) return 'MILDLY BULLISH';
    if(this.score>=40) return 'NEUTRAL';
    if(this.score>=30) return 'BEARISH';
    return 'STRONGLY BEARISH';
  }
};

/* ── GEOPOLITICAL RISK ENGINE ──────────────────────── */
const GeoEngine = {
  risks: [
    {label:'US Tariff War',score:78,color:'var(--red)'},
    {label:'Russia-Ukraine',score:65,color:'var(--orange)'},
    {label:'Middle East',score:71,color:'var(--red)'},
    {label:'China-Taiwan',score:55,color:'var(--orange)'},
    {label:'OPEC Oil Price',score:60,color:'var(--orange)'},
    {label:'INR/USD Rate',score:45,color:'var(--yellow)'},
    {label:'Fed Policy',score:70,color:'var(--red)'},
    {label:'India Politics',score:35,color:'var(--green)'},
  ],

  countryRisks: [
    {country:'USA',score:68,level:'high'},
    {country:'China',score:72,level:'high'},
    {country:'Russia',score:81,level:'critical'},
    {country:'Pakistan',score:74,level:'high'},
    {country:'Iran',score:76,level:'critical'},
    {country:'Saudi',score:48,level:'medium'},
    {country:'Israel',score:79,level:'critical'},
    {country:'EU',score:42,level:'medium'},
    {country:'Japan',score:30,level:'low'},
  ],

  events: [
    {time:'09:45',txt:'Trump signs executive order on semiconductor tariffs',tags:['#Trade','#Tech'],color:'var(--red)',impact:'HIGH'},
    {time:'09:22',txt:'RBI Governor: Inflation within tolerance band, no urgency to cut',tags:['#RBI','#Rates'],color:'var(--cyan)',impact:'HIGH'},
    {time:'08:55',txt:'OPEC+ holds production cuts — Brent rises $2.4/bbl',tags:['#OPEC','#Crude'],color:'var(--orange)',impact:'MEDIUM'},
    {time:'08:30',txt:'FII sold ₹2,847cr yesterday — March net: ₹-18,400cr',tags:['#FII','#Markets'],color:'var(--red)',impact:'HIGH'},
    {time:'08:10',txt:'China GDP Q1 at 4.8% — below 5% target, stimulus likely',tags:['#China','#EM'],color:'var(--cyan)',impact:'MEDIUM'},
    {time:'07:45',txt:'US CPI YoY 3.2% vs est 3.0% — rate cut timeline shifts',tags:['#Fed','#Inflation'],color:'var(--orange)',impact:'HIGH'},
    {time:'07:20',txt:'Russia strikes Kyiv infrastructure — crude spikes $1.8',tags:['#Russia','#Ukraine'],color:'var(--red)',impact:'MEDIUM'},
    {time:'06:55',txt:'India-US trade deal: Pharma exports get 15% duty relief',tags:['#IndiaUSA','#Pharma'],color:'var(--green)',impact:'MEDIUM'},
    {time:'06:30',txt:'Japan BOJ hints at rate hike — Yen strengthens, carry unwind risk',tags:['#BOJ','#Yen'],color:'var(--orange)',impact:'HIGH'},
    {time:'06:00',txt:'Gift Nifty: +87 pts indicating positive market open',tags:['#GiftNifty','#Nifty'],color:'var(--green)',impact:'LOW'},
  ],

  sectorImpact: [
    {name:'IT / Tech',pct:+2.3},
    {name:'Banking',pct:+1.1},
    {name:'Pharma',pct:+1.8},
    {name:'Auto',pct:-0.7},
    {name:'Oil & Gas',pct:-2.4},
    {name:'Metal',pct:+0.4},
    {name:'FMCG',pct:-0.3},
    {name:'Infra',pct:+1.5},
    {name:'Realty',pct:-0.5},
    {name:'Telecom',pct:+0.8},
  ],

  tick() {
    this.risks.forEach(r=>{ r.score = Math.min(99,Math.max(10,r.score+(Math.random()-0.5)*3)); });
  }
};

/* ── SOCIAL FEED ENGINE ────────────────────────────── */
const FeedEngine = {
  posts: [],
  maxPosts: 80,
  filter: 'all',
  postCount: 0,

  generatePost(influencer) {
    const pool = POST_POOL.filter(t => !t.cats || t.cats.some(c=>influencer.cat===c||true));
    const tmpl = pool[Math.floor(Math.random()*pool.length)];
    return {
      id: ++this.postCount,
      influencer,
      txt: fillTemplate(tmpl.txt),
      impact: tmpl.impact==='very_high'?'high':tmpl.impact,
      sent: tmpl.sent,
      ts: Date.now() - Math.floor(Math.random()*300000),
      likes: Math.round(Math.random()*50000+500),
      retweets: Math.round(Math.random()*8000+100),
    };
  },

  init() {
    // Generate initial posts from all 50 influencers
    const shuffled = [...INFLUENCERS].sort(()=>Math.random()-0.5);
    shuffled.forEach((inf,i) => {
      const post = this.generatePost(inf);
      post.ts = Date.now() - i*45000;
      this.posts.unshift(post);
    });
    AIEngine.updateSentiment(this.posts);
  },

  addRandomPost() {
    const inf = INFLUENCERS[Math.floor(Math.random()*INFLUENCERS.length)];
    const post = this.generatePost(inf);
    this.posts.unshift(post);
    if(this.posts.length > this.maxPosts) this.posts.pop();
    AIEngine.updateSentiment(this.posts.slice(0,30));
    return post;
  },

  getFiltered() {
    if(this.filter==='all') return this.posts;
    return this.posts.filter(p=>p.influencer.cat===this.filter||p.influencer.flag.includes(this.filter));
  }
};

/* ── NEWS TICKER ───────────────────────────────────── */
const TICKER_ITEMS = [
  {txt:'NIFTY50 hits intraday high — #BankNifty leads gains',type:'bullish'},
  {txt:'FED WATCH: Rate cut odds shift to June 2025 post CPI data',type:'neutral'},
  {txt:'CRUDE OIL: Brent at $83.4/bbl — OPEC+ maintains cuts',type:'neutral'},
  {txt:'RBI FOREX: Reserves at $648Bn — comfortable cushion against FII outflows',type:'bullish'},
  {txt:'TRUMP TARIFFS: 25% on steel, 10% on electronics — India negotiating exemption',type:'bearish'},
  {txt:'SIP FLOWS: March SIP collections hit ₹23,800cr — new record high',type:'bullish'},
  {txt:'GIFT NIFTY: +92 pts — positive cues from US, Asia markets',type:'bullish'},
  {txt:'MSCI: India weight increased to 19.8% — passive inflows $2.1Bn expected',type:'bullish'},
  {txt:'RUSSIA-UKRAINE: Ceasefire talks in Istanbul — crude drops $3/bbl',type:'bullish'},
  {txt:'SEBI: New regulations on algo trading — circuit breakers enhanced',type:'neutral'},
  {txt:'CHINA: Stimulus package announced — EM rally, India benefits',type:'bullish'},
  {txt:'GOLD: ₹82,400/10g — safe haven buying on global uncertainty',type:'neutral'},
  {txt:'IT SECTOR: TCS, Infosys up on GenAI deal wins — outperforming Nifty',type:'bullish'},
  {txt:'USDINR: 84.92 — RBI defends 85 level with forex intervention',type:'neutral'},
  {txt:'OPEC+: Houthi attacks on Red Sea shipping — freight costs surge',type:'bearish'},
  {txt:'INDIA GDP: Q3FY25 at 7.2% — beats 6.8% estimate, IMF upgrades forecast',type:'bullish'},
];

/* ── CHART INITIALIZATION ──────────────────────────── */
function initChart(containerId) {
  if(typeof LightweightCharts==='undefined') return null;
  const container = document.getElementById(containerId);
  if(!container) return null;

  const chart = LightweightCharts.createChart(container, {
    layout: { background:{color:'#040c18'}, textColor:'#6e8ab0' },
    grid: { vertLines:{color:'rgba(26,48,96,0.35)'}, horzLines:{color:'rgba(26,48,96,0.35)'} },
    crosshair: { mode: LightweightCharts.CrosshairMode.Normal },
    rightPriceScale: { borderColor:'#1a3060', textColor:'#6e8ab0' },
    timeScale: { borderColor:'#1a3060', textColor:'#6e8ab0', timeVisible:true, secondsVisible:false },
    handleScroll: true,
    handleScale: true,
  });

  const candleSeries = chart.addCandlestickSeries({
    upColor:'#00e676', downColor:'#ff1744',
    borderUpColor:'#00e676', borderDownColor:'#ff1744',
    wickUpColor:'rgba(0,230,118,0.6)', wickDownColor:'rgba(255,23,68,0.6)',
  });

  candleSeries.setData(NiftyEngine.priceHistory);

  const volumeSeries = chart.addHistogramSeries({
    color:'rgba(0,212,255,0.15)',
    priceFormat:{type:'volume'},
    priceScaleId:'volume',
    scaleMargins:{top:0.8,bottom:0},
  });

  volumeSeries.setData(NiftyEngine.priceHistory.map(b=>({time:b.time,value:b.volume,color:b.close>=b.open?'rgba(0,230,118,0.15)':'rgba(255,23,68,0.15)'})));

  NiftyEngine.seriesCandle = candleSeries;
  NiftyEngine.seriesVolume = volumeSeries;
  NiftyEngine.chart = chart;

  new ResizeObserver(()=>{ if(container.clientWidth>0) chart.applyOptions({width:container.clientWidth,height:container.clientHeight}); }).observe(container);
  chart.timeScale().fitContent();
  return chart;
}

/* ── RENDER FUNCTIONS ──────────────────────────────── */
function renderPost(post) {
  const inf = post.influencer;
  const plt = inf.plt.map(p=>`<span class="plt-icon plt-${p==='x'?'x':p==='truth'?'t':'li'}">${p==='x'?'𝕏':p==='truth'?'T':'in'}</span>`).join('');
  const impactClass = post.impact==='high'?'high':post.impact==='medium'?'medium':'low';
  const sentClass = post.sent;
  return `
  <div class="feed-post" data-cat="${inf.cat}" data-flag="${inf.flag}">
    <div class="post-hdr">
      <div class="p-avatar" style="background:${inf.avatar}">${inf.init}</div>
      <div class="p-info">
        <div class="p-name">${inf.flag} ${inf.name}</div>
        <div class="p-handle">${inf.handle} · <span style="color:var(--text2)">${inf.role}</span></div>
      </div>
      <div class="p-time">${timeAgo(post.ts)}</div>
    </div>
    <div class="p-body">${formatPostBody(post.txt)}</div>
    <div class="p-foot">
      <span class="ibadge ${impactClass}">${post.impact} impact</span>
      <span class="sbadge ${sentClass}">${post.sent}</span>
      <span style="color:var(--text3);font-size:9px;margin-left:2px">♥ ${(post.likes/1000).toFixed(1)}k · ↺ ${(post.retweets/1000).toFixed(1)}k</span>
      <span class="ml-auto">${plt}</span>
    </div>
  </div>`;
}

function renderFeed(container) {
  const posts = FeedEngine.getFiltered();
  container.innerHTML = posts.map(renderPost).join('');
}

function renderOptMini(spot) {
  const chain = OptionsEngine.buildChain(spot,5);
  const atm = OptionsEngine.getATM(spot);
  let rows = '';
  chain.slice(2,8).forEach(r => {
    rows += `<tr class="${r.isATM?'atm':''}">
      <td>${r.strike}</td>
      <td class="c-iv">${r.callIV}%</td>
      <td class="c-oi">${(r.callOI/1000).toFixed(0)}K</td>
      <td class="p-oi">${(r.putOI/1000).toFixed(0)}K</td>
      <td class="p-iv">${r.putIV}%</td>
    </tr>`;
  });
  const pcr = OptionsEngine.getPCR(chain);
  const mp = OptionsEngine.getMaxPain(chain);
  return {rows, pcr, mp, atm};
}

function updateHeaderTickers() {
  const n = NiftyEngine.current;
  const nc = NiftyEngine.getChange();
  const ncp = NiftyEngine.getChangePct();
  const bn = BankNiftyEngine.current;
  const bnc = BankNiftyEngine.getChange();
  const bncp = BankNiftyEngine.getChangePct();
  const sign = v => v>=0?'+':'';
  const cls = v => v>=0?'up':'down';
  const arr = v => v>=0?'▲':'▼';

  document.getElementById('nifty-val') && (document.getElementById('nifty-val').textContent = n.toFixed(2));
  document.getElementById('nifty-chg') && (document.getElementById('nifty-chg').innerHTML = `<span class="${cls(nc)}">${arr(nc)} ${sign(nc)}${nc.toFixed(2)} (${sign(ncp)}${ncp.toFixed(2)}%)</span>`);
  document.getElementById('bn-val') && (document.getElementById('bn-val').textContent = bn.toFixed(2));
  document.getElementById('bn-chg') && (document.getElementById('bn-chg').innerHTML = `<span class="${cls(bnc)}">${arr(bnc)} ${sign(bnc)}${bnc.toFixed(2)} (${sign(bncp)}${bncp.toFixed(2)}%)</span>`);

  // Chart header
  const cpEl = document.getElementById('chart-price');
  if(cpEl){
    cpEl.textContent = n.toFixed(2);
    cpEl.className = `c-price ${nc>=0?'up':'down'}`;
  }
  const cchgEl = document.getElementById('chart-chg');
  if(cchgEl) cchgEl.innerHTML = `<span class="${cls(nc)}">${arr(nc)} ${sign(nc)}${nc.toFixed(2)} (${sign(ncp)}${ncp.toFixed(2)}%)</span>`;

  document.getElementById('stat-open') && (document.getElementById('stat-open').textContent = NiftyEngine.open.toFixed(2));
  document.getElementById('stat-high') && (document.getElementById('stat-high').textContent = NiftyEngine.high.toFixed(2));
  document.getElementById('stat-low') && (document.getElementById('stat-low').textContent = NiftyEngine.low.toFixed(2));
}

/* ── ENHANCED MULTI-FACTOR SIGNAL UPDATE ─────────────── */
function updateSignals() {
  const spot = NiftyEngine.current;
  const bars = NiftyEngine.priceHistory;
  if(bars.length < 30) return;

  /* compute all technical indicators */
  const tech = TechEngine.compute(bars);

  /* build options chain for PCR/MaxPain/OI levels */
  const chain = OptionsEngine.buildChain(spot, 22);
  const pcr   = OptionsEngine.getPCR(chain);
  const maxPain = OptionsEngine.getMaxPain(chain);
  const levels  = TechEngine.oi_levels(spot, chain);
  const geoScore = AIEngine.score;

  /* run 10-factor weighted evaluation */
  const sig = SignalEngine.eval(spot, tech, pcr, maxPain, geoScore);

  /* ── Main signal badge ── */
  const sigEl = document.getElementById('sig-signal');
  if(sigEl){
    const cls = sig.signal==='BUY'?'buy':sig.signal==='SELL'?'sell':'hold';
    const strong = sig.strength>=7?' sig-strong':'';
    sigEl.innerHTML = `<span class="sig-badge ${cls}${strong}">${sig.signal==='BUY'?'▲ BUY CALL':sig.signal==='SELL'?'▼ BUY PUT':'◆ HOLD'}</span>`;
  }

  /* ── Strength bar (10 mini bars) ── */
  const strEl = document.getElementById('sig-strength');
  if(strEl){
    const bcls = sig.signal==='BUY'?'str-bull':sig.signal==='SELL'?'str-bear':'str-hold';
    const barsHtml = Array.from({length:10},(_,i)=>`<div class="str-bar ${i<sig.strength?bcls:''}"></div>`).join('');
    strEl.innerHTML = `<div class="str-bars">${barsHtml}</div><span class="str-num">${sig.strength}/10</span>`;
  }

  /* ── Confidence + ratio header ── */
  const confHdr = document.getElementById('sig-conf-header');
  if(confHdr){
    const ratio = `${sig.bullScore}:${sig.bearScore}`;
    const dir = sig.signal==='BUY'?'BULL 🟢':sig.signal==='SELL'?'BEAR 🔴':'NEUTRAL 🟡';
    confHdr.textContent = `CONF: ${sig.confidence}% | STR: ${sig.strength}/10 | ${dir} (${ratio})`;
    confHdr.style.color = sig.signal==='BUY'?'var(--green)':sig.signal==='SELL'?'var(--red)':'var(--orange)';
  }

  /* ── OI-based key levels ── */
  const $=id=>document.getElementById(id);
  $('sig-support')  && ($('sig-support').textContent  = levels.s1.toLocaleString('en-IN'));
  $('sig-support2') && ($('sig-support2').textContent = levels.s2.toLocaleString('en-IN'));
  $('sig-resist')   && ($('sig-resist').textContent   = levels.r1.toLocaleString('en-IN'));
  $('sig-resist2')  && ($('sig-resist2').textContent  = levels.r2.toLocaleString('en-IN'));
  $('sig-atm')      && ($('sig-atm').textContent      = OptionsEngine.getATM(spot).toLocaleString('en-IN'));

  /* ── India VIX (derived from BB width) ── */
  const vixEst = (tech.bb.width*0.9+Math.random()*0.5+10.5).toFixed(2);
  $('sig-vix') && ($('sig-vix').textContent = vixEst);

  /* ── Indicator cards strip ── */
  renderIndicatorCards(sig.indicators);

  /* ── Signal history ── */
  renderSignalHistory();

  /* ── AI recommendation ── */
  updateAIRec(sig, spot, chain);

  /* ── Panel glow based on signal strength ── */
  const panel = document.getElementById('signals');
  if(panel){
    if(sig.signal==='BUY'&&sig.strength>=7)
      panel.style.boxShadow='inset 0 0 40px rgba(0,230,118,.07),0 0 20px rgba(0,230,118,.05)';
    else if(sig.signal==='SELL'&&sig.strength>=7)
      panel.style.boxShadow='inset 0 0 40px rgba(255,23,68,.07),0 0 20px rgba(255,23,68,.05)';
    else panel.style.boxShadow='none';
  }

  /* ── Alert toast for very strong signal ── */
  if(sig.strength>=9&&sig.signal!=='HOLD'&&Math.random()<0.12){
    const aligned=sig.indicators.filter(i=>i.s===sig.signal).map(i=>i.name).join(', ');
    showToast(`🎯 STRONG ${sig.signal} SIGNAL — ${sig.strength}/10`,
      `Confidence ${sig.confidence}% | Aligned: ${aligned}`);
  }
}

/* ── INDICATOR CARDS STRIP ──────────────────────────── */
function renderIndicatorCards(indicators) {
  const el = document.getElementById('indicator-cards');
  if(!el) return;
  const COL={green:'var(--green)',red:'var(--red)',yellow:'var(--orange)'};
  const BG ={green:'rgba(0,230,118,.12)',red:'rgba(255,23,68,.12)',yellow:'rgba(255,145,0,.1)'};
  const BO ={green:'rgba(0,230,118,.35)',red:'rgba(255,23,68,.35)',yellow:'rgba(255,145,0,.3)'};
  el.innerHTML = indicators.map(ind=>`
    <div class="ind-card" style="border-color:${BO[ind.c]||BO.yellow};background:${BG[ind.c]||BG.yellow}" title="${ind.reason}">
      <div class="ind-name">${ind.name}</div>
      <div class="ind-val" style="color:${COL[ind.c]}">${ind.val}</div>
      <div class="ind-sig" style="color:${COL[ind.c]}">${ind.s==='BUY'?'▲':ind.s==='SELL'?'▼':'◆'} ${ind.s}</div>
    </div>`).join('');
}

/* ── SIGNAL HISTORY ─────────────────────────────────── */
function renderSignalHistory() {
  const el = document.getElementById('sig-history');
  if(!el) return;
  if(!SignalEngine.history.length){
    el.innerHTML='<div style="font-size:10px;color:var(--text3);padding:4px 0">No signals yet — waiting for confluence...</div>';
    return;
  }
  const COLS={BUY:'var(--green)',SELL:'var(--red)',HOLD:'var(--orange)'};
  el.innerHTML = SignalEngine.history.slice(0,5).map(h=>`
    <div class="sh-item">
      <span class="sh-time">${h.time}</span>
      <span class="sh-sig" style="color:${COLS[h.signal]}">${h.signal==='BUY'?'▲':h.signal==='SELL'?'▼':'◆'} ${h.signal}</span>
      <span class="sh-conf">${h.confidence}%</span>
      <span class="sh-price mono">${h.spot}</span>
      <span class="sh-str" style="color:${COLS[h.signal]}">${h.strength}/10</span>
    </div>`).join('');
}

/* ── AI RECOMMENDATION (from SignalEngine) ──────────── */
function updateAIRec(sig, spot, chain) {
  const atm = OptionsEngine.getATM(spot);
  let strike, type, expiry='27 Mar', premium;

  if(sig.signal==='BUY'){
    /* Strong: buy ATM CE; moderate: buy ATM+100 CE */
    strike = sig.strength>=8 ? atm : atm+100;
    type   = 'CALL';
  } else if(sig.signal==='SELL'){
    strike = sig.strength>=8 ? atm : atm-100;
    type   = 'PUT';
  } else {
    /* Neutral: suggest the side with more weight */
    strike = atm;
    type   = sig.bullScore>sig.bearScore ? 'CALL' : 'PUT';
  }

  const row = chain.find(r=>r.strike===strike) || chain[Math.floor(chain.length/2)];
  if(row) premium = type==='CALL' ? row.callPrice : row.putPrice;

  /* badge */
  const badgeEl = document.getElementById('air-badge');
  if(badgeEl){ badgeEl.textContent=type; badgeEl.className=`air-badge ${type==='CALL'?'air-call':'air-put'}`; }

  /* description */
  const top3 = sig.indicators.filter(i=>i.s===sig.signal).slice(0,3).map(i=>i.name).join(' + ');
  const airTxt = document.getElementById('air-text');
  if(airTxt) airTxt.textContent =
    `${type} ${strike}${type==='CALL'?'CE':'PE'} | Exp: ${expiry} | LTP: ₹${premium?.toFixed(1)||'--'} | ${top3||'mixed signals'} aligned | Bull ${sig.bullScore} vs Bear ${sig.bearScore}`;

  /* confidence */
  const airConf = document.getElementById('air-conf');
  if(airConf) airConf.textContent = `AI Confidence: ${sig.confidence}% | Signal Strength: ${sig.strength}/10`;

  AIEngine.recommendation = {type, strike, expiry, confidence:sig.confidence, premium};
}

function updateSentimentPanel() {
  const s = AIEngine.score;
  const color = AIEngine.getSentimentColor();
  const label = AIEngine.getSentimentLabel();

  document.getElementById('sent-score') && (document.getElementById('sent-score').textContent = s);
  document.getElementById('sent-score') && (document.getElementById('sent-score').style.color = color);
  document.getElementById('sent-label') && (document.getElementById('sent-label').textContent = label);
  document.getElementById('sent-label') && (document.getElementById('sent-label').style.color = color);
  document.getElementById('sent-bar') && (document.getElementById('sent-bar').style.width = s+'%');
  document.getElementById('sent-bar') && (document.getElementById('sent-bar').style.background = `linear-gradient(90deg,var(--red),var(--orange) 40%,${color})`);
  document.getElementById('sb-bull') && (document.getElementById('sb-bull').textContent = AIEngine.bullCount);
  document.getElementById('sb-bear') && (document.getElementById('sb-bear').textContent = AIEngine.bearCount);
  document.getElementById('sb-neu') && (document.getElementById('sb-neu').textContent = AIEngine.neuCount);
}

function updateGeoRisk() {
  const container = document.getElementById('geo-risk-bars');
  if(!container) return;
  container.innerHTML = GeoEngine.risks.map(r=>`
    <div class="rgauge">
      <span class="rg-lbl">${r.label}</span>
      <div class="rg-bg"><div class="rg-bar" style="width:${r.score}%;background:${r.color}"></div></div>
      <span class="rg-val" style="color:${r.color}">${Math.round(r.score)}</span>
    </div>`).join('');
}

function updateEvents() {
  const container = document.getElementById('events-list');
  if(!container) return;
  container.innerHTML = GeoEngine.events.slice(0,8).map(ev=>`
    <div class="ev-item">
      <span class="ev-time">${ev.time}</span>
      <div class="ev-dot" style="background:${ev.color}"></div>
      <span class="ev-txt">${ev.txt}</span>
      <span class="ev-imp" style="background:${ev.color}22;color:${ev.color};border:1px solid ${ev.color}44">${ev.impact}</span>
    </div>`).join('');
}

function updateOptMini() {
  const {rows,pcr,mp,atm} = renderOptMini(NiftyEngine.current);
  document.getElementById('opt-mini-rows') && (document.getElementById('opt-mini-rows').innerHTML = rows);
  document.getElementById('opt-pcr') && (document.getElementById('opt-pcr').textContent = pcr);
  document.getElementById('opt-mp') && (document.getElementById('opt-mp').textContent = mp);
  document.getElementById('opt-atm') && (document.getElementById('opt-atm').textContent = atm);
  document.getElementById('opt-atm-lbl') && (document.getElementById('opt-atm-lbl').textContent = `ATM: ${atm}`);
  const pcrEl = document.getElementById('opt-pcr');
  if(pcrEl) pcrEl.style.color = pcr>1.2?'var(--green)':pcr<0.8?'var(--red)':'var(--orange)';
}

function showToast(title, body, dur=4000) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<div class="toast-title">🔔 ${title}</div><div class="toast-body">${body}</div>`;
  document.body.appendChild(t);
  setTimeout(()=>t.remove(), dur);
}

/* ── CLOCK ────────────────────────────────────────── */
function updateClock() {
  const el = document.getElementById('clock');
  if(el) el.textContent = `🕐 ${fmtIST()} IST`;
  const badge = document.getElementById('mkt-badge');
  if(badge){
    const open = isMarketOpen();
    badge.className = `mkt-badge ${open?'mkt-open':'mkt-closed'}`;
    badge.innerHTML = `<span class="pulse-dot"></span>${open?'NSE LIVE':'MARKET CLOSED'}`;
  }
}

/* ── MAIN TICK ─────────────────────────────────────── */
let tickCount = 0;
function tick() {
  tickCount++;
  NiftyEngine.tick();
  BankNiftyEngine.tick();
  updateHeaderTickers();

  if(tickCount%3===0) updateSignals();
  if(tickCount%5===0) {
    GeoEngine.tick();
    updateGeoRisk();
  }
  if(tickCount%10===0) updateOptMini();
  if(tickCount%8===0) updateSentimentPanel();
}

function addNewPost() {
  const post = FeedEngine.addRandomPost();
  const container = document.getElementById('feed-posts');
  if(container && FeedEngine.filter==='all') {
    const div = document.createElement('div');
    div.innerHTML = renderPost(post);
    const el = div.firstElementChild;
    container.insertBefore(el, container.firstChild);
    if(container.children.length>60) container.lastChild.remove();
  }
  updateSentimentPanel();
  // Random alerts
  if(post.impact==='high' && Math.random()<0.3) {
    showToast(`${post.influencer.flag} ${post.influencer.name}`, post.txt.substring(0,120)+'...');
  }
}

/* ── INIT ─────────────────────────────────────────── */
window.GeoPulse = {
  NiftyEngine,BankNiftyEngine,OptionsEngine,AIEngine,GeoEngine,FeedEngine,
  TechEngine,SignalEngine,
  initChart,renderFeed,updateHeaderTickers,updateSignals,updateSentimentPanel,
  updateGeoRisk,updateEvents,updateOptMini,showToast,INFLUENCERS,POST_POOL,
  renderIndicatorCards,renderSignalHistory,updateAIRec,
  tick,addNewPost,updateClock,
  init() {
    NiftyEngine.init();
    FeedEngine.init();
    AIEngine.updateSentiment(FeedEngine.posts);
    updateClock();
    setInterval(updateClock,1000);
    setInterval(tick, 1800);
    setInterval(addNewPost, 7000+Math.random()*5000);
  }
};
