"""Build the source-checked EasyEA printable guide. Requires reportlab."""
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/oppaat/vauvan-ja-taaperon-ensiapuopas.pdf'
OUT.parent.mkdir(parents=True, exist_ok=True)
pdfmetrics.registerFont(TTFont('EA', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('EA-Bold', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'))
pdfmetrics.registerFontFamily('EA', normal='EA', bold='EA-Bold')
W, H = 595.2756, 841.8898
M = 28
INK, GREEN, YELLOW = map(HexColor, ['#1C1C1C','#1F5140','#F4F000'])
SOFT = HexColor('#F4F5EF')
c = canvas.Canvas(str(OUT), pagesize=(W,H))
c.setTitle('Vauvan ja taaperon ensiapuopas - EasyEA')
c.setAuthor('EasyEA')
c.setSubject('Tulostettava ensiavun muistilista ja lähteet. Tarkistettu 8.10.2026.')

def text(t,x,y,size=10.3,bold=False,color=INK):
    c.setFillColor(color); c.setFont('EA-Bold' if bold else 'EA',size); c.drawString(x,y,t)

def para(t,x,top,width,size=10.3,leading=14,color=INK):
    p=Paragraph(t,ParagraphStyle('p',fontName='EA',fontSize=size,leading=leading,textColor=color))
    _,h=p.wrap(width,1000); p.drawOn(c,x,top-h); return top-h

def box(x,top,width,height,fill=SOFT):
    c.setFillColor(fill); c.roundRect(x,top-height,width,height,8,fill=1,stroke=0)

def title(n,t,y):
    box(M,y+18,25,25,YELLOW);text(str(n),M+8,y+1,12,True)
    text(t,M+36,y,12.3,True)

def footer(page):
    text('EasyEA | Lähteet tarkistettu 8.10.2026 | v1.0',M,20,7.7)
    c.setFont('EA',7.7); c.drawRightString(W-M,20,f'{page} / 2')

# Page 1: an A4 emergency memory card. No decorative medical illustration.
text('EasyEA',M,802,15,True)
text('Vauvan ja taaperon ensiapu',M,773,21,True)
text('Tulosta tämä sivu jääkaapin oveen. Vauva: alle 1 v. Taapero: 1-3 v.',M,752,9.4)
box(M,738,W-2*M,61,YELLOW)
text('112',M+14,698,31,True)
para('<b>Hätätilanteessa soita 112.</b><br/>Käytä kaiutinta, kerro osoite ja mitä tapahtui.<br/>Vastaa kysymyksiin ja seuraa päivystäjän ohjeita.',M+105,726,W-2*M-119,10,13)

title(1,'Lapsi ei herää',650)
para('Puhuttele ja kosketa varovasti. <b>Soita 112.</b> Aseta lapsi selälleen tukevalle alustalle. Avaa hengitystie nostamalla leukaa: vauvan pää neutraalisti, taaperon päätä varovasti taakse. Katso rintakehää, kuuntele hengitystä ja tunnustele ilmavirtaa.',M,633,W-2*M,10.2,13.4)
box(M,575,W-2*M,43)
para('<b>Hengittää normaalisti:</b> käännä kylkiasentoon, pidä hengitystie avoinna ja seuraa hengitystä. Pidä lapsi lämpimänä ja odota ensihoitoa.',M+12,565,W-2*M-24,10,13)

title(2,'Ei hengitä normaalisti tai olet epävarma',510)
box(M,495,W-2*M,49,GREEN)
text('5 alkupuhallusta',M+12,474,13,True,white)
text('Sitten 30 painelua + 2 puhallusta',M+12,455,11.5,True,white)
col=(W-2*M-16)/2
text('VAUVA - ALLE 1 V',M,431,10,True,GREEN)
text('TAAPERO - 1-3 V',M+col+16,431,10,True,GREEN)
para('Peitä omalla suullasi vauvan suu ja sieraimet. Puhalla rauhallisesti vain sen verran, että rintakehä kohoaa. Paina keskeltä rintalastaa 2-3 sormella.',M,418,col,10,13)
para('Sulje sieraimet ja peitä suullasi lapsen suu. Puhalla rauhallisesti, kunnes rintakehä kohoaa. Paina keskeltä rintalastaa yhden käden kämmentyvellä.',M+col+16,418,col,10,13)
para('<b>Molemmilla:</b> paina noin kolmasosa rintakehän syvyydestä, 100-120 kertaa minuutissa. Jatka rytmiä 30:2, kunnes ensihoito ottaa vastuun ja antaa luvan lopettaa. Seuraa 112:n ohjeita.',M,349,W-2*M,9.8,13)

title(3,'Vierasesine tukkii hengityksen',286)
para('<b>Ei pysty hengittämään, ääntelemään tai yskimään:</b> toinen auttaja soittaa 112 heti. Jos olet yksin, anna 5 selkälyöntiä ja soita 112, ellei tukos poistu. Käytä kaiutinta.',M,270,W-2*M,9.9,13)
text('VAUVA - ALLE 1 V',M,222,10,True,GREEN)
text('TAAPERO - 1-3 V',M+col+16,222,10,True,GREEN)
para('Tue päätä, pidä vauva vatsallaan pää vartaloa alempana. Anna <b>5 lyöntiä lapaluiden väliin.</b> Käännä selälleen ja anna <b>5 painallusta rintalastalle</b> sormilla. Vuorottele. Ei vatsan nykäisyjä vauvalle.',M,210,col,9.8,12.7)
para('Kallista lapsi eteen pää alaspäin. Anna <b>5 lyöntiä lapaluiden väliin.</b> Asetu taakse: nyrkki pallean alle, toinen käsi päälle. Tee <b>5 nykäisyä sisään ja ylös.</b> Vuorottele. Hyvin pientä lasta voi auttaa vauvan tavoin.',M+col+16,210,col,9.8,12.7)
para('<b>Jos lapsi menee tajuttomaksi eikä hengitä normaalisti:</b> siirry elvytykseen (kohta 2) ja kerro muutoksesta hätäkeskukseen.',M,116,W-2*M,9.7,12.6)
box(M,80,W-2*M,35)
para('<b>Myrkytysepäily:</b> 0800 147 111 (24 h). Älä oksennuta. Selvitä aine ja määrä. Henkeä uhkaavissa oireissa soita <b>112</b>.',M+10,73,W-2*M-20,9.5,12)
footer(1)
c.showPage()

# Page 2: context, clickable source links and onward journey.
text('EasyEA',M,802,15,True)
text('Ennakoi. Harjoittele. Pidä ohje esillä.',M,770,19,True)
y=737
y=para('Ensimmäinen sivu on lyhyt ensiavun muistilista vauvan ja taaperon hoitajalle. Se auttaa palauttamaan perusvaiheet mieleen. Käytännön taitoja opitaan harjoittelemalla; muistilista ei korvaa ensiapukoulutusta tai hätäkeskuksen ohjeita.',M,y,W-2*M,11,16)
y-=28
text('Tulostus ja käyttö',M,y,13,True); y-=17
y=para('Tulosta <b>sivu 1 A4-koossa, 100 % / todellinen koko.</b> Pidä sivu helposti näkyvillä ja käy ohje läpi kaikkien lapsesta huolehtivien kanssa. Merkitse alla olevaan kohtaan osoite valmiiksi.',M,y,W-2*M,11,16)
y-=18
box(M,y,W-2*M,52)
text('Kodin osoite ja kunta:',M+12,y-19,10.5,True)
c.setStrokeColor(INK); c.line(M+12,y-38,W-M-12,y-38)
y-=80
text('Mitä tämän muistilistan rajaus tarkoittaa?',M,y,13,True);y-=18
y=para('Vauvan sarake on alle 1-vuotiaalle. Taaperon sarake on 1-3-vuotiaalle. Elvytysrytmi 30:2 vastaa SPR:n maallikko-ohjetta. Lapsen elvytykseen koulutettu voi toimia koulutuksensa mukaisesti, esimerkiksi rytmillä 15:2. Hätätilanteessa päivystäjä neuvoo. Ohje ei käsittele kaikkia vammoja ja sairauksia eikä vastasyntyneen elvytystä synnytyksen yhteydessä.',M,y,W-2*M,10.5,15)
y-=26
text('Lähteet - tarkistettu 8.10.2026',M,y,13,True);y-=20
sources=[
('SPR: vauvan elvytys','https://www.punainenristi.fi/ensiapu/ensiapuohjeet/elvytys/vauvan-elvytys/'),
('SPR: lapsen elvytys','https://www.punainenristi.fi/ensiapu/ensiapuohjeet/elvytys/lapsen-elvytys/'),
('SPR: vierasesine vauvan hengitysteissä','https://www.punainenristi.fi/ensiapu/ensiapuohjeet/vierasesineen-poistaminen-hengitysteista-vauva/'),
('SPR: vierasesine lapsen hengitysteissä','https://www.punainenristi.fi/ensiapu/ensiapuohjeet/vierasesineen-poistaminen-hengitysteista-lapsi/'),
('SPR: tajuttoman lapsen ensiapu','https://www.punainenristi.fi/ensiapu/ensiapuohjeet/tajuttoman-ensiapu/tajuttoman-lapsen-ensiapu/'),
('SPR: hätäilmoitus','https://www.punainenristi.fi/ensiapu/ensiapuohjeet/hatailmoituksen-tekeminen/'),
('HUS: Myrkytystietokeskus','https://www.hus.fi/potilaalle/sairaalat-ja-toimipisteet/myrkytystietokeskus')]
for label,url in sources:
    text(label+'  >',M,y,10.5,color=GREEN)
    c.linkURL(url,(M,y-3,W-M,y+12),relative=0,thickness=0)
    y-=23
y=para('Digitaalisessa PDF:ssä lähteiden nimet ovat klikattavia. Paperilla löydät ohjeet osoitteista <b>punainenristi.fi/ensiapu/ensiapuohjeet</b> ja <b>hus.fi</b> (Myrkytystietokeskus). EasyEA:n itsenäinen kooste; ei SPR:n tai HUS:n hyväksymä julkaisu. Lähteiden kuvia tai logoja ei ole käytetty.',M,y-4,W-2*M,9.4,13)
y-=25
if y<130: raise ValueError(f'Page 2 CTA position too low: {y}')
box(M,y,W-2*M,92,GREEN)
text('Harjoitelkaa lasten ensiapua yhdessä',M+14,y-24,12,True,white)
para('Kysy EasyEA:lta ryhmällesi sopivasta lähikoulutuksesta.<br/><b>jaminyholm@easyea.fi</b><br/>Kurssit ja yhteystiedot: <b>easyea.fi</b>',M+14,y-35,W-2*M-28,10.3,14,white)
c.linkURL('https://www.easyea.fi/kurssit/',(M,y-92,W-M,y),relative=0,thickness=0)
footer(2)
c.save()
print(OUT)
