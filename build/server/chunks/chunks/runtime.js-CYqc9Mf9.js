var Pe=Object.defineProperty;var a=(e,t)=>Pe(e,"name",{value:t,configurable:true});var P=class{type=3;name="";prefix="";value="";suffix="";modifier=3;constructor(t,r,n,c,l,f){this.type=t,this.name=r,this.prefix=n,this.value=c,this.suffix=l,this.modifier=f;}hasCustomName(){return this.name!==""&&typeof this.name!="number"}};a(P,"Part");var Re=/[$_\p{ID_Start}]/u,Ee=/[$_\u200C\u200D\p{ID_Continue}]/u,v=".*";function Oe(e,t){return (t?/^[\x00-\xFF]*$/:/^[\x00-\x7F]*$/).test(e)}a(Oe,"isASCII");function D(e,t=false){let r=[],n=0;for(;n<e.length;){let c=e[n],l=a(function(f){if(!t)throw new TypeError(f);r.push({type:"INVALID_CHAR",index:n,value:e[n++]});},"ErrorOrInvalid");if(c==="*"){r.push({type:"ASTERISK",index:n,value:e[n++]});continue}if(c==="+"||c==="?"){r.push({type:"OTHER_MODIFIER",index:n,value:e[n++]});continue}if(c==="\\"){r.push({type:"ESCAPED_CHAR",index:n++,value:e[n++]});continue}if(c==="{"){r.push({type:"OPEN",index:n,value:e[n++]});continue}if(c==="}"){r.push({type:"CLOSE",index:n,value:e[n++]});continue}if(c===":"){let f="",s=n+1;for(;s<e.length;){let i=e.substr(s,1);if(s===n+1&&Re.test(i)||s!==n+1&&Ee.test(i)){f+=e[s++];continue}break}if(!f){l(`Missing parameter name at ${n}`);continue}r.push({type:"NAME",index:n,value:f}),n=s;continue}if(c==="("){let f=1,s="",i=n+1,o=false;if(e[i]==="?"){l(`Pattern cannot start with "?" at ${i}`);continue}for(;i<e.length;){if(!Oe(e[i],false)){l(`Invalid character '${e[i]}' at ${i}.`),o=true;break}if(e[i]==="\\"){s+=e[i++]+e[i++];continue}if(e[i]===")"){if(f--,f===0){i++;break}}else if(e[i]==="("&&(f++,e[i+1]!=="?")){l(`Capturing groups are not allowed at ${i}`),o=true;break}s+=e[i++];}if(o)continue;if(f){l(`Unbalanced pattern at ${n}`);continue}if(!s){l(`Missing pattern at ${n}`);continue}r.push({type:"REGEX",index:n,value:s}),n=i;continue}r.push({type:"CHAR",index:n,value:e[n++]});}return r.push({type:"END",index:n,value:""}),r}a(D,"lexer");function F(e,t={}){let r=D(e);t.delimiter??="/#?",t.prefixes??="./";let n=`[^${x(t.delimiter)}]+?`,c=[],l=0,f=0,i=new Set,o=a(u=>{if(f<r.length&&r[f].type===u)return r[f++].value},"tryConsume"),h=a(()=>o("OTHER_MODIFIER")??o("ASTERISK"),"tryConsumeModifier"),p=a(u=>{let d=o(u);if(d!==void 0)return d;let{type:g,index:y}=r[f];throw new TypeError(`Unexpected ${g} at ${y}, expected ${u}`)},"mustConsume"),A=a(()=>{let u="",d;for(;d=o("CHAR")??o("ESCAPED_CHAR");)u+=d;return u},"consumeText"),xe=a(u=>u,"DefaultEncodePart"),N=t.encodePart||xe,H="",$=a(u=>{H+=u;},"appendToPendingFixedValue"),M=a(()=>{H.length&&(c.push(new P(3,"","",N(H),"",3)),H="");},"maybeAddPartFromPendingFixedValue"),X=a((u,d,g,y,Z)=>{let m=3;switch(Z){case "?":m=1;break;case "*":m=0;break;case "+":m=2;break}if(!d&&!g&&m===3){$(u);return}if(M(),!d&&!g){if(!u)return;c.push(new P(3,"","",N(u),"",m));return}let S;g?g==="*"?S=v:S=g:S=n;let k=2;S===n?(k=1,S=""):S===v&&(k=0,S="");let E;if(d?E=d:g&&(E=l++),i.has(E))throw new TypeError(`Duplicate name '${E}'.`);i.add(E),c.push(new P(k,E,N(u),S,N(y),m));},"addPart");for(;f<r.length;){let u=o("CHAR"),d=o("NAME"),g=o("REGEX");if(!d&&!g&&(g=o("ASTERISK")),d||g){let m=u??"";t.prefixes.indexOf(m)===-1&&($(m),m=""),M();let S=h();X(m,d,g,"",S);continue}let y=u??o("ESCAPED_CHAR");if(y){$(y);continue}if(o("OPEN")){let m=A(),S=o("NAME"),k=o("REGEX");!S&&!k&&(k=o("ASTERISK"));let E=A();p("CLOSE");let be=h();X(m,S,k,E,be);continue}M(),p("END");}return c}a(F,"parse");function x(e){return e.replace(/([.+*?^${}()[\]|/\\])/g,"\\$1")}a(x,"escapeString");function B(e){return e&&e.ignoreCase?"ui":"u"}a(B,"flags");function q(e,t,r){return W(F(e,r),t,r)}a(q,"stringToRegexp");function T(e){switch(e){case 0:return "*";case 1:return "?";case 2:return "+";case 3:return ""}}a(T,"modifierToString");function W(e,t,r={}){r.delimiter??="/#?",r.prefixes??="./",r.sensitive??=false,r.strict??=false,r.end??=true,r.start??=true,r.endsWith="";let n=r.start?"^":"";for(let s of e){if(s.type===3){s.modifier===3?n+=x(s.value):n+=`(?:${x(s.value)})${T(s.modifier)}`;continue}t&&t.push(s.name);let i=`[^${x(r.delimiter)}]+?`,o=s.value;if(s.type===1?o=i:s.type===0&&(o=v),!s.prefix.length&&!s.suffix.length){s.modifier===3||s.modifier===1?n+=`(${o})${T(s.modifier)}`:n+=`((?:${o})${T(s.modifier)})`;continue}if(s.modifier===3||s.modifier===1){n+=`(?:${x(s.prefix)}(${o})${x(s.suffix)})`,n+=T(s.modifier);continue}n+=`(?:${x(s.prefix)}`,n+=`((?:${o})(?:`,n+=x(s.suffix),n+=x(s.prefix),n+=`(?:${o}))*)${x(s.suffix)})`,s.modifier===0&&(n+="?");}let c=`[${x(r.endsWith)}]|$`,l=`[${x(r.delimiter)}]`;if(r.end)return r.strict||(n+=`${l}?`),r.endsWith.length?n+=`(?=${c})`:n+="$",new RegExp(n,B(r));r.strict||(n+=`(?:${l}(?=${c}))?`);let f=false;if(e.length){let s=e[e.length-1];s.type===3&&s.modifier===3&&(f=r.delimiter.indexOf(s)>-1);}return f||(n+=`(?=${l}|${c})`),new RegExp(n,B(r))}a(W,"partsToRegexp");var b={delimiter:"",prefixes:"",sensitive:true,strict:true},J={delimiter:".",prefixes:"",sensitive:true,strict:true},Q={delimiter:"/",prefixes:"/",sensitive:true,strict:true};function ee(e,t){return e.length?e[0]==="/"?true:!t||e.length<2?false:(e[0]=="\\"||e[0]=="{")&&e[1]=="/":false}a(ee,"isAbsolutePathname");function te(e,t){return e.startsWith(t)?e.substring(t.length,e.length):e}a(te,"maybeStripPrefix");function ke(e,t){return e.endsWith(t)?e.substr(0,e.length-t.length):e}a(ke,"maybeStripSuffix");function _(e){return !e||e.length<2?false:e[0]==="["||(e[0]==="\\"||e[0]==="{")&&e[1]==="["}a(_,"treatAsIPv6Hostname");var re=["ftp","file","http","https","ws","wss"];function U(e){if(!e)return  true;for(let t of re)if(e.test(t))return  true;return  false}a(U,"isSpecialScheme");function ne(e,t){if(e=te(e,"#"),t||e==="")return e;let r=new URL("https://example.com");return r.hash=e,r.hash?r.hash.substring(1,r.hash.length):""}a(ne,"canonicalizeHash");function se(e,t){if(e=te(e,"?"),t||e==="")return e;let r=new URL("https://example.com");return r.search=e,r.search?r.search.substring(1,r.search.length):""}a(se,"canonicalizeSearch");function ie(e,t){return t||e===""?e:_(e)?K(e):j(e)}a(ie,"canonicalizeHostname");function ae(e,t){if(t||e==="")return e;let r=new URL("https://example.com");return r.password=e,r.password}a(ae,"canonicalizePassword");function oe(e,t){if(t||e==="")return e;let r=new URL("https://example.com");return r.username=e,r.username}a(oe,"canonicalizeUsername");function ce(e,t,r){if(r||e==="")return e;if(t&&!re.includes(t))return new URL(`${t}:${e}`).pathname;let n=e[0]=="/";return e=new URL(n?e:"/-"+e,"https://example.com").pathname,n||(e=e.substring(2,e.length)),e}a(ce,"canonicalizePathname");function le(e,t,r){return z(t)===e&&(e=""),r||e===""?e:G(e)}a(le,"canonicalizePort");function fe(e,t){return e=ke(e,":"),t||e===""?e:w(e)}a(fe,"canonicalizeProtocol");function z(e){switch(e){case "ws":case "http":return "80";case "wws":case "https":return "443";case "ftp":return "21";default:return ""}}a(z,"defaultPortForProtocol");function w(e){if(e==="")return e;if(/^[-+.A-Za-z0-9]*$/.test(e))return e.toLowerCase();throw new TypeError(`Invalid protocol '${e}'.`)}a(w,"protocolEncodeCallback");function he(e){if(e==="")return e;let t=new URL("https://example.com");return t.username=e,t.username}a(he,"usernameEncodeCallback");function ue(e){if(e==="")return e;let t=new URL("https://example.com");return t.password=e,t.password}a(ue,"passwordEncodeCallback");function j(e){if(e==="")return e;if(/[\t\n\r #%/:<>?@[\]^\\|]/g.test(e))throw new TypeError(`Invalid hostname '${e}'`);let t=new URL("https://example.com");return t.hostname=e,t.hostname}a(j,"hostnameEncodeCallback");function K(e){if(e==="")return e;if(/[^0-9a-fA-F[\]:]/g.test(e))throw new TypeError(`Invalid IPv6 hostname '${e}'`);return e.toLowerCase()}a(K,"ipv6HostnameEncodeCallback");function G(e){if(e===""||/^[0-9]*$/.test(e)&&parseInt(e)<=65535)return e;throw new TypeError(`Invalid port '${e}'.`)}a(G,"portEncodeCallback");function de(e){if(e==="")return e;let t=new URL("https://example.com");return t.pathname=e[0]!=="/"?"/-"+e:e,e[0]!=="/"?t.pathname.substring(2,t.pathname.length):t.pathname}a(de,"standardURLPathnameEncodeCallback");function pe(e){return e===""?e:new URL(`data:${e}`).pathname}a(pe,"pathURLPathnameEncodeCallback");function ge(e){if(e==="")return e;let t=new URL("https://example.com");return t.search=e,t.search.substring(1,t.search.length)}a(ge,"searchEncodeCallback");function me(e){if(e==="")return e;let t=new URL("https://example.com");return t.hash=e,t.hash.substring(1,t.hash.length)}a(me,"hashEncodeCallback");var C=class{#i;#n=[];#t={};#e=0;#s=1;#l=0;#o=0;#d=0;#p=0;#g=false;constructor(t){this.#i=t;}get result(){return this.#t}parse(){for(this.#n=D(this.#i,true);this.#e<this.#n.length;this.#e+=this.#s){if(this.#s=1,this.#n[this.#e].type==="END"){if(this.#o===0){this.#b(),this.#f()?this.#r(9,1):this.#h()?this.#r(8,1):this.#r(7,0);continue}else if(this.#o===2){this.#u(5);continue}this.#r(10,0);break}if(this.#d>0)if(this.#A())this.#d-=1;else continue;if(this.#T()){this.#d+=1;continue}switch(this.#o){case 0:this.#P()&&this.#u(1);break;case 1:if(this.#P()){this.#C();let t=7,r=1;this.#E()?(t=2,r=3):this.#g&&(t=2),this.#r(t,r);}break;case 2:this.#S()?this.#u(3):(this.#x()||this.#h()||this.#f())&&this.#u(5);break;case 3:this.#O()?this.#r(4,1):this.#S()&&this.#r(5,1);break;case 4:this.#S()&&this.#r(5,1);break;case 5:this.#y()?this.#p+=1:this.#w()&&(this.#p-=1),this.#k()&&!this.#p?this.#r(6,1):this.#x()?this.#r(7,0):this.#h()?this.#r(8,1):this.#f()&&this.#r(9,1);break;case 6:this.#x()?this.#r(7,0):this.#h()?this.#r(8,1):this.#f()&&this.#r(9,1);break;case 7:this.#h()?this.#r(8,1):this.#f()&&this.#r(9,1);break;case 8:this.#f()&&this.#r(9,1);break;}}this.#t.hostname!==void 0&&this.#t.port===void 0&&(this.#t.port="");}#r(t,r){switch(this.#o){case 0:break;case 1:this.#t.protocol=this.#c();break;case 2:break;case 3:this.#t.username=this.#c();break;case 4:this.#t.password=this.#c();break;case 5:this.#t.hostname=this.#c();break;case 6:this.#t.port=this.#c();break;case 7:this.#t.pathname=this.#c();break;case 8:this.#t.search=this.#c();break;case 9:this.#t.hash=this.#c();break;}this.#o!==0&&t!==10&&([1,2,3,4].includes(this.#o)&&[6,7,8,9].includes(t)&&(this.#t.hostname??=""),[1,2,3,4,5,6].includes(this.#o)&&[8,9].includes(t)&&(this.#t.pathname??=this.#g?"/":""),[1,2,3,4,5,6,7].includes(this.#o)&&t===9&&(this.#t.search??="")),this.#R(t,r);}#R(t,r){this.#o=t,this.#l=this.#e+r,this.#e+=r,this.#s=0;}#b(){this.#e=this.#l,this.#s=0;}#u(t){this.#b(),this.#o=t;}#m(t){return t<0&&(t=this.#n.length-t),t<this.#n.length?this.#n[t]:this.#n[this.#n.length-1]}#a(t,r){let n=this.#m(t);return n.value===r&&(n.type==="CHAR"||n.type==="ESCAPED_CHAR"||n.type==="INVALID_CHAR")}#P(){return this.#a(this.#e,":")}#E(){return this.#a(this.#e+1,"/")&&this.#a(this.#e+2,"/")}#S(){return this.#a(this.#e,"@")}#O(){return this.#a(this.#e,":")}#k(){return this.#a(this.#e,":")}#x(){return this.#a(this.#e,"/")}#h(){if(this.#a(this.#e,"?"))return  true;if(this.#n[this.#e].value!=="?")return  false;let t=this.#m(this.#e-1);return t.type!=="NAME"&&t.type!=="REGEX"&&t.type!=="CLOSE"&&t.type!=="ASTERISK"}#f(){return this.#a(this.#e,"#")}#T(){return this.#n[this.#e].type=="OPEN"}#A(){return this.#n[this.#e].type=="CLOSE"}#y(){return this.#a(this.#e,"[")}#w(){return this.#a(this.#e,"]")}#c(){let t=this.#n[this.#e],r=this.#m(this.#l).index;return this.#i.substring(r,t.index)}#C(){let t={};Object.assign(t,b),t.encodePart=w;let r=q(this.#c(),void 0,t);this.#g=U(r);}};a(C,"Parser");var V=["protocol","username","password","hostname","port","pathname","search","hash"],O="*";function Se(e,t){if(typeof e!="string")throw new TypeError("parameter 1 is not of type 'string'.");let r=new URL(e,t);return {protocol:r.protocol.substring(0,r.protocol.length-1),username:r.username,password:r.password,hostname:r.hostname,port:r.port,pathname:r.pathname,search:r.search!==""?r.search.substring(1,r.search.length):void 0,hash:r.hash!==""?r.hash.substring(1,r.hash.length):void 0}}a(Se,"extractValues");function R(e,t){return t?I(e):e}a(R,"processBaseURLString");function L(e,t,r){let n;if(typeof t.baseURL=="string")try{n=new URL(t.baseURL),t.protocol===void 0&&(e.protocol=R(n.protocol.substring(0,n.protocol.length-1),r)),!r&&t.protocol===void 0&&t.hostname===void 0&&t.port===void 0&&t.username===void 0&&(e.username=R(n.username,r)),!r&&t.protocol===void 0&&t.hostname===void 0&&t.port===void 0&&t.username===void 0&&t.password===void 0&&(e.password=R(n.password,r)),t.protocol===void 0&&t.hostname===void 0&&(e.hostname=R(n.hostname,r)),t.protocol===void 0&&t.hostname===void 0&&t.port===void 0&&(e.port=R(n.port,r)),t.protocol===void 0&&t.hostname===void 0&&t.port===void 0&&t.pathname===void 0&&(e.pathname=R(n.pathname,r)),t.protocol===void 0&&t.hostname===void 0&&t.port===void 0&&t.pathname===void 0&&t.search===void 0&&(e.search=R(n.search.substring(1,n.search.length),r)),t.protocol===void 0&&t.hostname===void 0&&t.port===void 0&&t.pathname===void 0&&t.search===void 0&&t.hash===void 0&&(e.hash=R(n.hash.substring(1,n.hash.length),r));}catch{throw new TypeError(`invalid baseURL '${t.baseURL}'.`)}if(typeof t.protocol=="string"&&(e.protocol=fe(t.protocol,r)),typeof t.username=="string"&&(e.username=oe(t.username,r)),typeof t.password=="string"&&(e.password=ae(t.password,r)),typeof t.hostname=="string"&&(e.hostname=ie(t.hostname,r)),typeof t.port=="string"&&(e.port=le(t.port,e.protocol,r)),typeof t.pathname=="string"){if(e.pathname=t.pathname,n&&!ee(e.pathname,r)){let c=n.pathname.lastIndexOf("/");c>=0&&(e.pathname=R(n.pathname.substring(0,c+1),r)+e.pathname);}e.pathname=ce(e.pathname,e.protocol,r);}return typeof t.search=="string"&&(e.search=se(t.search,r)),typeof t.hash=="string"&&(e.hash=ne(t.hash,r)),e}a(L,"applyInit");function I(e){return e.replace(/([+*?:{}()\\])/g,"\\$1")}a(I,"escapePatternString");function Te(e){return e.replace(/([.+*?^${}()[\]|/\\])/g,"\\$1")}a(Te,"escapeRegexpString");function Ae(e,t){t.delimiter??="/#?",t.prefixes??="./",t.sensitive??=false,t.strict??=false,t.end??=true,t.start??=true,t.endsWith="";let r=".*",n=`[^${Te(t.delimiter)}]+?`,c=/[$_\u200C\u200D\p{ID_Continue}]/u,l="";for(let f=0;f<e.length;++f){let s=e[f];if(s.type===3){if(s.modifier===3){l+=I(s.value);continue}l+=`{${I(s.value)}}${T(s.modifier)}`;continue}let i=s.hasCustomName(),o=!!s.suffix.length||!!s.prefix.length&&(s.prefix.length!==1||!t.prefixes.includes(s.prefix)),h=f>0?e[f-1]:null,p=f<e.length-1?e[f+1]:null;if(!o&&i&&s.type===1&&s.modifier===3&&p&&!p.prefix.length&&!p.suffix.length)if(p.type===3){let A=p.value.length>0?p.value[0]:"";o=c.test(A);}else o=!p.hasCustomName();if(!o&&!s.prefix.length&&h&&h.type===3){let A=h.value[h.value.length-1];o=t.prefixes.includes(A);}o&&(l+="{"),l+=I(s.prefix),i&&(l+=`:${s.name}`),s.type===2?l+=`(${s.value})`:s.type===1?i||(l+=`(${n})`):s.type===0&&(!i&&(!h||h.type===3||h.modifier!==3||o||s.prefix!=="")?l+="*":l+=`(${r})`),s.type===1&&i&&s.suffix.length&&c.test(s.suffix[0])&&(l+="\\"),l+=I(s.suffix),o&&(l+="}"),s.modifier!==3&&(l+=T(s.modifier));}return l}a(Ae,"partsToPattern");var Y=class{#i;#n={};#t={};#e={};#s={};#l=false;constructor(t={},r,n){try{let c;if(typeof r=="string"?c=r:n=r,typeof t=="string"){let i=new C(t);if(i.parse(),t=i.result,c===void 0&&typeof t.protocol!="string")throw new TypeError("A base URL must be provided for a relative constructor string.");t.baseURL=c;}else {if(!t||typeof t!="object")throw new TypeError("parameter 1 is not of type 'string' and cannot convert to dictionary.");if(c)throw new TypeError("parameter 1 is not of type 'string'.")}typeof n>"u"&&(n={ignoreCase:!1});let l={ignoreCase:n.ignoreCase===!0},f={pathname:O,protocol:O,username:O,password:O,hostname:O,port:O,search:O,hash:O};this.#i=L(f,t,!0),z(this.#i.protocol)===this.#i.port&&(this.#i.port="");let s;for(s of V){if(!(s in this.#i))continue;let i={},o=this.#i[s];switch(this.#t[s]=[],s){case "protocol":Object.assign(i,b),i.encodePart=w;break;case "username":Object.assign(i,b),i.encodePart=he;break;case "password":Object.assign(i,b),i.encodePart=ue;break;case "hostname":Object.assign(i,J),_(o)?i.encodePart=K:i.encodePart=j;break;case "port":Object.assign(i,b),i.encodePart=G;break;case "pathname":U(this.#n.protocol)?(Object.assign(i,Q,l),i.encodePart=de):(Object.assign(i,b,l),i.encodePart=pe);break;case "search":Object.assign(i,b,l),i.encodePart=ge;break;case "hash":Object.assign(i,b,l),i.encodePart=me;break}try{this.#s[s]=F(o,i),this.#n[s]=W(this.#s[s],this.#t[s],i),this.#e[s]=Ae(this.#s[s],i),this.#l=this.#l||this.#s[s].some(h=>h.type===2);}catch{throw new TypeError(`invalid ${s} pattern '${this.#i[s]}'.`)}}}catch(c){throw new TypeError(`Failed to construct 'URLPattern': ${c.message}`)}}get[Symbol.toStringTag](){return "URLPattern"}test(t={},r){let n={pathname:"",protocol:"",username:"",password:"",hostname:"",port:"",search:"",hash:""};if(typeof t!="string"&&r)throw new TypeError("parameter 1 is not of type 'string'.");if(typeof t>"u")return  false;try{typeof t=="object"?n=L(n,t,!1):n=L(n,Se(t,r),!1);}catch{return  false}let c;for(c of V)if(!this.#n[c].exec(n[c]))return  false;return  true}exec(t={},r){let n={pathname:"",protocol:"",username:"",password:"",hostname:"",port:"",search:"",hash:""};if(typeof t!="string"&&r)throw new TypeError("parameter 1 is not of type 'string'.");if(typeof t>"u")return;try{typeof t=="object"?n=L(n,t,!1):n=L(n,Se(t,r),!1);}catch{return null}let c={};r?c.inputs=[t,r]:c.inputs=[t];let l;for(l of V){let f=this.#n[l].exec(n[l]);if(!f)return null;let s={};for(let[i,o]of this.#t[l].entries())if(typeof o=="string"||typeof o=="number"){let h=f[i+1];s[o]=h;}c[l]={input:n[l]??"",groups:s};}return c}static compareComponent(t,r,n){let c=a((i,o)=>{for(let h of ["type","modifier","prefix","value","suffix"]){if(i[h]<o[h])return  -1;if(i[h]===o[h])continue;return 1}return 0},"comparePart"),l=new P(3,"","","","",3),f=new P(0,"","","","",3),s=a((i,o)=>{let h=0;for(;h<Math.min(i.length,o.length);++h){let p=c(i[h],o[h]);if(p)return p}return i.length===o.length?0:c(i[h]??l,o[h]??l)},"comparePartList");return !r.#e[t]&&!n.#e[t]?0:r.#e[t]&&!n.#e[t]?s(r.#s[t],[f]):!r.#e[t]&&n.#e[t]?s([f],n.#s[t]):s(r.#s[t],n.#s[t])}get protocol(){return this.#e.protocol}get username(){return this.#e.username}get password(){return this.#e.password}get hostname(){return this.#e.hostname}get port(){return this.#e.port}get pathname(){return this.#e.pathname}get search(){return this.#e.search}get hash(){return this.#e.hash}get hasRegExpGroups(){return this.#l}};a(Y,"URLPattern");

if (!globalThis.URLPattern) {
  globalThis.URLPattern = Y;
}

/**
* The project's locales that have been specified in the settings.
*
* @example
*   if (locales.includes(userSelectedLocale) === false) {
*     throw new Error('Locale is not available');
*   }
*/
var locales = ["en", "am"];
/** @type {string} */
var cookieName = "PARAGLIDE_LOCALE";
/** @type {number} */
var cookieMaxAge = 3456e4;
/**
* @type {Array<"cookie" | "baseLocale" | "globalVariable" | "url" | "preferredLanguage" | "localStorage" | `custom-${string}`>}
*/
var strategy = ["cookie", "baseLocale"];
/**
* Route-level strategy overrides.
*
* `match` uses URLPattern syntax.
*
* @type {Array<{
*   match: string;
*   strategy?: Array<"cookie" | "baseLocale" | "globalVariable" | "url" | "preferredLanguage" | "localStorage" | `custom-${string}`>;
*   exclude?: boolean;
* }>}
*/
var routeStrategies = [{
	"match": "/am/:path(.*)?",
	"strategy": ["url", "cookie"]
}];
/**
* @typedef {{
* 		getStore(): {
*   		locale?: Locale,
* 			origin?: string,
* 			messageCalls?: Set<string>
*   	} | undefined,
* 		run: (store: { locale?: Locale, origin?: string, messageCalls?: Set<string>},
*    cb: any) => any
* }} ParaglideAsyncLocalStorage
*/
/**
* Server side async local storage that is set by `serverMiddleware()`.
*
* The variable is used to retrieve the locale and origin in a server-side
* rendering context without effecting other requests.
*
* @type {ParaglideAsyncLocalStorage | undefined}
*/
var serverAsyncLocalStorage = void 0;
/**
* Returns the current server-side async local storage instance.
*
* Accessing the mutable value through a function keeps it observable when
* module interceptors wrap exported bindings and snapshot their initial value.
*
* @returns {ParaglideAsyncLocalStorage | undefined}
*/
function getServerAsyncLocalStorage() {
	return serverAsyncLocalStorage;
}
/**
* Sets the server side async local storage.
*
* The function is needed because the `runtime.js` file
* must define the `serverAsyncLocalStorage` variable to
* avoid a circular import between `runtime.js` and
* `server.js` files.
*
* @param {ParaglideAsyncLocalStorage | undefined} value
*/
function overwriteServerAsyncLocalStorage(value) {
	serverAsyncLocalStorage = value;
}
/** @type {any} */ globalThis.__paraglide = globalThis.__paraglide ?? {};
/** @type {any} */ globalThis.__paraglide.ssr = globalThis.__paraglide.ssr ?? {};
/**
* This is a fallback to get started with a custom
* strategy and avoid type errors.
*
* The implementation is overwritten
* by `overwriteGetLocale()` and `defineSetLocale()`.
*
* @type {Locale | undefined}
*/
var _locale;
var localeInitiallySet = false;
/**
* Get the current locale.
*
* The locale is resolved using your configured strategies (URL, cookie, localStorage, etc.)
* in the order they are defined. In SSR contexts, the locale is retrieved from AsyncLocalStorage
* which is set by the `paraglideMiddleware()`.
*
* @see https://paraglidejs.com/strategy - Configure locale detection strategies
*
* @example
*   if (getLocale() === 'de') {
*     console.log('Germany 🇩🇪');
*   } else if (getLocale() === 'nl') {
*     console.log('Netherlands 🇳🇱');
*   }
*
* @returns {Locale} The current locale.
*/
var getLocale = () => {
	if (serverAsyncLocalStorage) {
		const locale = serverAsyncLocalStorage?.getStore()?.locale;
		if (locale) return locale;
	}
	const resolved = resolveLocaleWithStrategies(strategy);
	if (resolved) {
		if (!localeInitiallySet) {
			_locale = resolved;
			localeInitiallySet = true;
			setLocale(resolved, { reload: false });
		}
		return resolved;
	}
	throw new Error("No locale found. Read the docs https://paraglidejs.com/errors#no-locale-found");
};
/**
* Resolve locale for a given URL using route-aware strategies.
*
* @param {string | URL} url
* @returns {Locale}
*/
function getLocaleForUrl(url) {
	const resolved = resolveLocaleWithStrategies(getStrategyForUrl(url), typeof url === "string" ? url : url.href);
	if (resolved) return resolved;
	throw new Error("No locale found. Read the docs https://paraglidejs.com/errors#no-locale-found");
}
/**
* @param {typeof strategy} strategyToUse
* @param {string | undefined} urlForUrlStrategy
* @returns {Locale | undefined}
*/
function resolveLocaleWithStrategies(strategyToUse, urlForUrlStrategy) {
	/** @type {string | undefined} */
	let locale;
	for (const strat of strategyToUse) {
		if (strat === "cookie") locale = extractLocaleFromCookie();
		else if (strat === "baseLocale") locale = "en";
		else if (isCustomStrategy(strat) && customClientStrategies.has(strat)) {
			const handler = customClientStrategies.get(strat);
			if (handler) {
				const result = handler.getLocale();
				if (result instanceof Promise) continue;
				if (result !== void 0) return assertIsLocale(result);
			}
		}
		const matchedLocale = toLocale(locale);
		if (matchedLocale) return matchedLocale;
	}
}
var rtlLanguages = /* @__PURE__ */ new Set([
	"ar",
	"dv",
	"fa",
	"he",
	"ks",
	"ku",
	"ps",
	"sd",
	"ug",
	"ur",
	"yi"
]);
/**
* Get writing direction for a locale.
*
* Uses `Intl.Locale` text info when available and falls back to a
* language-based RTL check for runtimes without `getTextInfo()`.
*
* @example
*   getTextDirection(); // "ltr" or "rtl" for current locale
*   getTextDirection("ar"); // "rtl"
*   getTextDirection("en"); // "ltr"
*
* @param {string} [locale] - Target locale. If not provided, uses `getLocale()`
* @returns {"ltr" | "rtl"}
*/
function getTextDirection(locale = getLocale()) {
	try {
		const intlLocale = new Intl.Locale(locale);
		const direction = intlLocale.getTextInfo?.().direction ?? intlLocale.textInfo?.direction;
		if (direction === "ltr" || direction === "rtl") return direction;
	} catch {}
	const language = locale.split("-")[0]?.toLowerCase();
	return rtlLanguages.has(language ?? "") ? "rtl" : "ltr";
}
/**
* @typedef {(newLocale: Locale, options?: { reload?: boolean }) => void | Promise<void>} SetLocaleFn
*/
/**
* Set the locale.
*
* Updates the locale using your configured strategies (cookie, localStorage, URL, etc.).
* By default, this navigates the client to the localized URL or reloads the current
* document to reflect the new locale. `reload: false` is a narrow browser-only escape
* hatch for a fully client-rendered, non-URL-routed surface that owns its reactive
* updates and document state. It does not re-render the UI or update the document.
* Do not use it for normal locale pickers, URL-routed pages, or switching an SSR,
* SSG, or hydrated document. It is incompatible with per-locale builds.
*
* If any custom strategy's `setLocale` function is async, then this function
* will become async as well.
*
* @see https://paraglidejs.com/strategy
*
* @example
*   setLocale('en');
*
* @example
*   setLocale('en', { reload: false });
*
* @type {SetLocaleFn}
*/
var setLocale = (newLocale, options) => {
	({ ...options });
	try {
		getLocale();
	} catch {}
	/** @type {Array<Promise<void>>} */
	const customSetLocalePromises = [];
	let strategyToUse = strategy;
	for (const strat of strategyToUse) if (strat === "cookie") continue;
	else if (strat === "baseLocale") continue;
	else if (strat === "url" && typeof window !== "undefined") localizeUrl(window.location.href, { locale: newLocale }).href;
	else if (isCustomStrategy(strat) && customClientStrategies.has(strat)) {
		const handler = customClientStrategies.get(strat);
		if (handler) {
			let result = handler.setLocale(newLocale);
			if (result instanceof Promise) {
				result = result.catch((error) => {
					throw new Error(`Custom strategy "${strat}" setLocale failed.`, { cause: error });
				});
				customSetLocalePromises.push(result);
			}
		}
	}
	if (customSetLocalePromises.length) return Promise.all(customSetLocalePromises).then(() => {});
};
/**
* The origin of the current URL.
*
* Defaults to "http://example.com" in non-browser environments. If this
* behavior is not desired, the implementation can be overwritten
* by `overwriteGetUrlOrigin()`.
*
* @type {() => string}
*/
var getUrlOrigin = () => {
	if (serverAsyncLocalStorage) return serverAsyncLocalStorage.getStore()?.origin ?? "http://fallback.com";
	else if (typeof window !== "undefined") return window.location.origin;
	return "http://fallback.com";
};
/**
* Coerces a locale-like string to the canonical locale value used by the runtime.
*
* @param {unknown} value
* @returns {Locale | undefined}
*/
function toLocale(value) {
	if (typeof value !== "string") return;
	const lowerValue = value.toLowerCase();
	for (const locale of locales) if (locale.toLowerCase() === lowerValue) return locale;
}
/**
* Asserts that the input can be normalized to a locale.
*
* @param {unknown} input - The input to check.
* @returns {Locale} The input normalized to a Locale.
* @throws {Error} If the input is not a locale.
*/
function assertIsLocale(input) {
	const locale = toLocale(input);
	if (locale) return locale;
	throw new Error(`Invalid locale: ${input}. Expected one of: ${locales.join(", ")}`);
}
/**
* Extracts a locale from a request using the provided strategy order.
*
* @param {Request} request
* @param {typeof strategy} strategies
* @param {string | URL} [url]
* @returns {Locale}
*/
var extractLocaleFromRequestWithStrategies = (request, strategies, url = request.url) => {
	const effectiveRequestUrl = resolveEffectiveRequestUrl(request, url);
	/** @type {string|undefined} */
	let locale;
	for (const strat of strategies) {
		if (strat === "cookie") {
			const cookiePrefix = "PARAGLIDE_LOCALE=";
			locale = request.headers.get("cookie")?.split(";").map((c) => c.trim()).find((c) => c.startsWith(cookiePrefix))?.slice(17);
		} else if (strat === "url") locale = extractLocaleFromUrl(effectiveRequestUrl);
		else if (strat === "globalVariable") locale = _locale;
		else if (strat === "baseLocale") return "en";
		else if (strat === "localStorage") continue;
		else if (isCustomStrategy(strat)) continue;
		const matchedLocale = toLocale(locale);
		if (matchedLocale) return matchedLocale;
	}
	throw new Error("No locale found. There is an error in your strategy. Try adding 'baseLocale' as the very last strategy. Read more here https://paraglidejs.com/errors#no-locale-found");
};
/**
* @param {Request} request
* @param {string | URL | undefined} effectiveRequestUrl
* @returns {URL}
*/
function resolveEffectiveRequestUrl(request, effectiveRequestUrl = request.url) {
	if (effectiveRequestUrl instanceof URL) return new URL(effectiveRequestUrl.href);
	return new URL(effectiveRequestUrl, request.url);
}
/**
* Asynchronously extracts a locale from a request.
*
* This function supports async custom server strategies, unlike the synchronous
* `extractLocaleFromRequest`. Use this function when you have custom server strategies
* that need to perform asynchronous operations (like database calls) in their getLocale method.
*
* The function first processes any custom server strategies asynchronously, then falls back
* to the synchronous `extractLocaleFromRequest` for all other strategies.
*
* @see {@link https://github.com/opral/inlang-paraglide-js/issues/527#issuecomment-2978151022}
*
* @example
*   // Basic usage
*   const locale = await extractLocaleFromRequestAsync(request);
*
* @example
*   // With custom async server strategy
*   defineCustomServerStrategy("custom-database", {
*     getLocale: async (request) => {
*       const userId = extractUserIdFromRequest(request);
*       return await getUserLocaleFromDatabase(userId);
*     }
*   });
*
*   const locale = await extractLocaleFromRequestAsync(request);
*
* @param {Request} request - The request object to extract the locale from.
* @param {{ effectiveRequestUrl?: string | URL }} [options] - Effective request URL to use for route matching and locale detection with the URL strategy.
* @returns {Promise<Locale>} The extracted locale.
*/
var extractLocaleFromRequestAsync = async (request, options = {}) => {
	/** @type {string|undefined} */
	let locale;
	const effectiveRequestUrl = resolveEffectiveRequestUrlFromRequestAsync(request, options.effectiveRequestUrl);
	const strategy = getStrategyForUrl(effectiveRequestUrl);
	for (const strat of strategy) if (isCustomStrategy(strat) && customServerStrategies.has(strat)) {
		const handler = customServerStrategies.get(strat);
		if (handler)
 /** @type {string|undefined} */
		locale = await handler.getLocale(request);
		const matchedLocale = toLocale(locale);
		if (matchedLocale) return matchedLocale;
	}
	return extractLocaleFromRequestWithStrategies(request, strategy, effectiveRequestUrl);
};
/**
* @param {Request} request
* @param {string | URL | undefined} effectiveRequestUrl
* @returns {URL}
*/
function resolveEffectiveRequestUrlFromRequestAsync(request, effectiveRequestUrl = request.url) {
	if (effectiveRequestUrl instanceof URL) return new URL(effectiveRequestUrl.href);
	return new URL(effectiveRequestUrl, request.url);
}
var cookieNamePattern = cookieName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
var localeCookiePattern = new RegExp(`(?:^|;\\s*)${cookieNamePattern}=([^;]*)`);
var noCachedLocale = Symbol();
/** @type {Locale | undefined | typeof noCachedLocale} */
var cachedLocaleFromCookie = noCachedLocale;
/**
* Clears the cached locale from `document.cookie`.
*/
function clearLocaleCookieCache() {
	cachedLocaleFromCookie = noCachedLocale;
}
function scheduleLocaleCookieCacheClear() {
	if (typeof queueMicrotask === "function") queueMicrotask(clearLocaleCookieCache);
	else Promise.resolve().then(clearLocaleCookieCache);
}
/**
* Extracts a cookie from the document.
*
* Will return undefined if the document is not available or if the cookie is not set.
* The `document` object is not available in server-side rendering, so this function should not be called in that context.
*
* @returns {Locale | undefined}
*/
function extractLocaleFromCookie() {
	if (typeof document === "undefined") return;
	if (cachedLocaleFromCookie !== noCachedLocale) return cachedLocaleFromCookie;
	const locale = document.cookie.match(localeCookiePattern)?.[1];
	cachedLocaleFromCookie = toLocale(locale);
	scheduleLocaleCookieCacheClear();
	return cachedLocaleFromCookie;
}
/**
* If extractLocaleFromUrl is called many times on the same page and the URL
* hasn't changed, we don't need to recompute it every time which can get expensive.
* We might use a LRU cache if needed, but for now storing only the last result is enough.
* https://github.com/opral/monorepo/pull/3575#discussion_r2066731243
*/
/** @type {string|undefined} */
var cachedUrl;
/** @type {Locale|undefined} */
var cachedLocale;
/**
* Extracts the locale from a given URL using native URLPattern.
*
* The built-in default `/:locale/...` routing is case-insensitive because it
* canonicalizes the first path segment with `toLocale()`. Custom `urlPatterns`
* keep URLPattern's normal exact matching semantics for path segments.
*
* @param {URL|string} url - The full URL from which to extract the locale.
* @returns {Locale|undefined} The extracted locale, or undefined if no locale is found.
*/
function extractLocaleFromUrl(url) {
	const urlString = typeof url === "string" ? url : url.href;
	if (cachedUrl === urlString) return cachedLocale;
	/** @type {Locale | undefined} */
	let result;
	result = defaultUrlPatternExtractLocale(url);
	cachedUrl = urlString;
	cachedLocale = result;
	return result;
}
/**
* https://github.com/opral/inlang-paraglide-js/issues/381
*
* @param {URL | string} url - The full URL from which to extract the locale.
* @returns {Locale | undefined} The extracted locale, or undefined if no locale is found.
*/
function defaultUrlPatternExtractLocale(url) {
	return toLocale(new URL(url, "http://example.com").pathname.split("/").filter(Boolean)[0]) || "en";
}
/**
* Lower-level URL localization function, primarily used in server contexts.
*
* This function is designed for server-side usage where you need precise control
* over URL localization, such as in middleware or request handlers. It works with
* URL objects and always returns absolute URLs.
*
* For client-side UI components, use `localizeHref()` instead, which provides
* a more convenient API with relative paths and automatic locale detection.
*
* @see https://paraglidejs.com/i18n-routing
*
* @example
* ```typescript
* // Server middleware example
* app.use((req, res, next) => {
*   const url = new URL(req.url, `${req.protocol}://${req.headers.host}`);
*   const localized = localizeUrl(url, { locale: "de" });
*
*   if (localized.href !== url.href) {
*     return res.redirect(localized.href);
*   }
*   next();
* });
* ```
*
* @example
* ```typescript
* // Using with URL patterns
* const url = new URL("https://example.com/about");
* localizeUrl(url, { locale: "de" });
* // => URL("https://example.com/de/about")
*
* // Using with domain-based localization
* const url = new URL("https://example.com/store");
* localizeUrl(url, { locale: "de" });
* // => URL("https://de.example.com/store")
* ```
*
* @param {string | URL} url - The URL to localize. If string, must be absolute.
* @param {object} [options] - Options for localization
* @param {Locale} [options.locale] - Target locale. If not provided, uses getLocale()
* @returns {URL} The localized URL, always absolute
*/
function localizeUrl(url, options) {
	return localizeUrlDefaultPattern(url, options?.locale ? assertIsLocale(options?.locale) : getLocale());
}
/**
* https://github.com/opral/inlang-paraglide-js/issues/381
*
* @param {string | URL} url
* @param {Locale} locale
* @returns {URL}
*/
function localizeUrlDefaultPattern(url, locale) {
	const urlObj = typeof url === "string" ? new URL(url, getUrlOrigin()) : new URL(url);
	if (extractLocaleFromUrl(urlObj) === locale) return urlObj;
	const pathSegments = urlObj.pathname.split("/").filter(Boolean);
	if (pathSegments.length > 0 && toLocale(pathSegments[0])) pathSegments.shift();
	if (locale === "en") urlObj.pathname = "/" + pathSegments.join("/");
	else urlObj.pathname = "/" + locale + "/" + pathSegments.join("/");
	return urlObj;
}
/**
* Low-level URL de-localization function, primarily used in server contexts.
*
* This function is designed for server-side usage where you need precise control
* over URL de-localization, such as in middleware or request handlers. It works with
* URL objects and always returns absolute URLs.
*
* For client-side UI components, use `deLocalizeHref()` instead, which provides
* a more convenient API with relative paths.
*
* @see https://paraglidejs.com/i18n-routing
*
* @example
* ```typescript
* // Server middleware example
* app.use((req, res, next) => {
*   const url = new URL(req.url, `${req.protocol}://${req.headers.host}`);
*   const baseUrl = deLocalizeUrl(url);
*
*   // Store the base URL for later use
*   req.baseUrl = baseUrl;
*   next();
* });
* ```
*
* @example
* ```typescript
* // Using with URL patterns
* const url = new URL("https://example.com/de/about");
* deLocalizeUrl(url); // => URL("https://example.com/about")
*
* // Using with domain-based localization
* const url = new URL("https://de.example.com/store");
* deLocalizeUrl(url); // => URL("https://example.com/store")
* ```
*
* @param {string | URL} url - The URL to de-localize. If string, must be absolute.
* @returns {URL} The de-localized URL, always absolute
*/
function deLocalizeUrl(url) {
	return deLocalizeUrlDefaultPattern(url);
}
/**
* De-localizes a URL using the default pattern (/:locale/*)
* @param {string|URL} url
* @returns {URL}
*/
function deLocalizeUrlDefaultPattern(url) {
	const urlObj = typeof url === "string" ? new URL(url, getUrlOrigin()) : new URL(url);
	const pathSegments = urlObj.pathname.split("/").filter(Boolean);
	if (pathSegments.length > 0 && toLocale(pathSegments[0])) urlObj.pathname = "/" + pathSegments.slice(1).join("/");
	return urlObj;
}
/** @type {string | undefined} */
var cachedRouteStrategyUrl;
/** @type {{ match: string; strategy?: typeof strategy; exclude?: boolean } | undefined} */
var cachedRouteStrategy;
/**
* Match route policy against both the public URL and its canonical URL.
*
* The function is deliberately separate from variables.js: configuration is
* inert data, while canonicalization and route selection form a routing layer.
*
* @param {string | URL} url
* @returns {{ match: string; strategy?: typeof strategy; exclude?: boolean } | undefined}
*/
function findMatchingRouteStrategy(url) {
	if (routeStrategies.length === 0) return;
	const urlString = typeof url === "string" ? url : url.href;
	if (cachedRouteStrategyUrl === urlString) return cachedRouteStrategy;
	const publicUrl = new URL(urlString, "http://example.com");
	const canonicalUrl = deLocalizeUrl(publicUrl);
	const candidateUrls = canonicalUrl.href === publicUrl.href ? [publicUrl] : [publicUrl, canonicalUrl];
	let match;
	for (const candidateUrl of candidateUrls) {
		for (const routeStrategy of routeStrategies) if (new URLPattern(routeStrategy.match, candidateUrl.href).exec(candidateUrl.href)) {
			match = routeStrategy;
			break;
		}
		if (match) break;
	}
	cachedRouteStrategyUrl = urlString;
	cachedRouteStrategy = match;
	return match;
}
/**
* Returns the strategy to use for a specific URL.
*
* If no route strategy matches (or the matching rule is `exclude: true`),
* the global strategy is returned.
*
* @param {string | URL} url
* @returns {typeof strategy}
*/
function getStrategyForUrl(url) {
	const routeStrategy = findMatchingRouteStrategy(url);
	if (routeStrategy && routeStrategy.exclude !== true && Array.isArray(routeStrategy.strategy)) return routeStrategy.strategy;
	return strategy;
}
/**
* Returns whether the given URL is excluded from middleware i18n processing.
*
* @param {string | URL} url
* @returns {boolean}
*/
function isExcludedByRouteStrategy(url) {
	return findMatchingRouteStrategy(url)?.exclude === true;
}
/**
* @typedef {object} ShouldRedirectServerInput
* @property {Request} request
* @property {string | URL} [effectiveRequestUrl] - Effective request URL to use for route matching, locale detection with the URL strategy, and redirect targets.
* @property {Locale} [locale]
*
* @typedef {object} ShouldRedirectClientInput
* @property {undefined} [request]
* @property {string | URL} [url]
* @property {Locale} [locale]
*
* @typedef {ShouldRedirectServerInput | ShouldRedirectClientInput} ShouldRedirectInput
*
* @typedef {object} ShouldRedirectResult
* @property {boolean} shouldRedirect - Indicates whether the consumer should perform a redirect.
* @property {Locale} locale - Locale resolved using the configured strategies.
* @property {URL | undefined} redirectUrl - Destination URL when a redirect is required.
*/
/**
* Determines whether a redirect is required to align the current URL with the active locale.
*
* This helper mirrors the logic that powers `paraglideMiddleware`, but works in both server
* and client environments. It evaluates the configured strategies in order, computes the
* canonical localized URL, and reports when the current URL does not match.
*
* When called in the browser without arguments, the current `window.location.href` is used.
*
* @see https://paraglidejs.com/i18n-routing#redirects
*
* @example
* // Client side usage (e.g. TanStack Router beforeLoad hook)
* async function beforeLoad({ location }) {
*   const decision = await shouldRedirect({ url: location.href });
*
*   if (decision.shouldRedirect) {
*     throw redirect({ to: decision.redirectUrl.href });
*   }
* }
*
* @example
* // Server side usage with a Request
* export async function handle(request) {
*   const decision = await shouldRedirect({ request });
*
*   if (decision.shouldRedirect) {
*     return Response.redirect(decision.redirectUrl, 307);
*   }
*
*   return render(request, decision.locale);
* }
*
* @example
* // Server side usage behind a proxy where request.url is not public-facing
* export async function handle(request) {
*   const effectiveRequestUrl = new URL(request.url);
*   effectiveRequestUrl.protocol = "https:";
*   effectiveRequestUrl.host = "example.com";
*
*   const decision = await shouldRedirect({
*     request,
*     effectiveRequestUrl,
*   });
*
*   if (decision.shouldRedirect) {
*     return Response.redirect(decision.redirectUrl, 307);
*   }
* }
*
* @param {ShouldRedirectInput} [input]
* @returns {Promise<ShouldRedirectResult>}
*/
async function shouldRedirect(input = {}) {
	const currentUrl = resolveUrl(input);
	const locale = await resolveLocale(input, currentUrl);
	const strategy = getStrategyForUrl(currentUrl.href);
	if (isExcludedByRouteStrategy(currentUrl.href) || !strategy.includes("url")) return {
		shouldRedirect: false,
		locale,
		redirectUrl: void 0
	};
	const localizedUrl = localizeUrl(currentUrl.href, { locale });
	const shouldRedirectToLocalizedUrl = normalizeUrl(localizedUrl.href) !== normalizeUrl(currentUrl.href);
	return {
		shouldRedirect: shouldRedirectToLocalizedUrl,
		locale,
		redirectUrl: shouldRedirectToLocalizedUrl ? localizedUrl : void 0
	};
}
/**
* Resolves the locale either from the provided input or by using the configured strategies.
*
* @param {ShouldRedirectInput} input
* @param {URL} currentUrl
* @returns {Promise<Locale>}
*/
async function resolveLocale(input, currentUrl) {
	const locale = toLocale(input.locale);
	if (locale) return locale;
	if (input.request) return extractLocaleFromRequestAsync(input.request, { effectiveRequestUrl: currentUrl });
	if ("url" in input && typeof input.url !== "undefined") return getLocaleForUrl(currentUrl.href);
	return getLocale();
}
/**
* Resolves the current URL from the provided input or runtime context.
*
* @param {ShouldRedirectInput} input
* @returns {URL}
*/
function resolveUrl(input) {
	if ("effectiveRequestUrl" in input && input.effectiveRequestUrl instanceof URL) return new URL(input.effectiveRequestUrl.href);
	if ("effectiveRequestUrl" in input && typeof input.effectiveRequestUrl === "string") return new URL(input.effectiveRequestUrl, input.request ? input.request.url : getUrlOrigin());
	if (input.request) return new URL(input.request.url);
	if ("url" in input && input.url instanceof URL) return new URL(input.url.href);
	if ("url" in input && typeof input.url === "string") return new URL(input.url, getUrlOrigin());
	if (typeof window !== "undefined" && window?.location?.href) return new URL(window.location.href);
	throw new Error("shouldRedirect() requires either a request, an absolute URL, or must run in a browser environment.");
}
/**
* Normalize url for comparison by stripping the trailing slash.
*
* @param {string} url
* @returns {string}
*/
function normalizeUrl(url) {
	const urlObj = new URL(url);
	urlObj.pathname = urlObj.pathname.replace(/\/$/, "");
	return urlObj.href;
}
/**
* @typedef {"cookie" | "baseLocale" | "globalVariable" | "url" | "preferredLanguage" | "localStorage"} BuiltInStrategy
*/
/**
* @typedef {`custom_${string}`} CustomStrategy
*/
/**
* @typedef {BuiltInStrategy | CustomStrategy} Strategy
*/
/**
* @typedef {Array<Strategy>} Strategies
*/
/**
* @typedef {{ getLocale: (request?: Request) => Promise<string | undefined> | (string | undefined) }} CustomServerStrategyHandler
*/
/**
* @typedef {{ getLocale: () => Promise<string|undefined> | (string | undefined), setLocale: (locale: string) => Promise<void> | void }} CustomClientStrategyHandler
*/
/** @type {Map<string, CustomServerStrategyHandler>} */
var customServerStrategies = /* @__PURE__ */ new Map();
/** @type {Map<string, CustomClientStrategyHandler>} */
var customClientStrategies = /* @__PURE__ */ new Map();
/**
* Checks if the given strategy is a custom strategy.
*
* @param {unknown} strategy The name of the custom strategy to validate.
* Must be a string that starts with "custom-" followed by alphanumeric characters, hyphens, or underscores.
* @returns {boolean} Returns true if it is a custom strategy, false otherwise.
*/
function isCustomStrategy(strategy) {
	return typeof strategy === "string" && /^custom-[A-Za-z0-9_-]+$/.test(strategy);
}

export { cookieMaxAge as a, getStrategyForUrl as b, cookieName as c, shouldRedirect as d, deLocalizeUrl as e, getTextDirection as f, getServerAsyncLocalStorage as g, getLocale as h, isExcludedByRouteStrategy as i, setLocale as j, locales as l, overwriteServerAsyncLocalStorage as o, serverAsyncLocalStorage as s };
//# sourceMappingURL=runtime.js-CYqc9Mf9.js.map
