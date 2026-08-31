import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity, AlertTriangle, Archive, ArrowLeft, BarChart3, Bell, Boxes, BriefcaseBusiness, Flag,
  Building2, Cake, CalendarDays, Check, ChevronDown, ChevronRight, CircleDollarSign, ClipboardCheck,
  Clock3, Copy, Crown, Download, Edit3, Eye, FileText, Filter, GitBranch, Globe2, GraduationCap, History,
  IdCard, LayoutDashboard, ListChecks, LockKeyhole, Megaphone, Menu, MessageCircle, MessageSquareText, MoreHorizontal, Package, Send,
  Landmark, Mail, MapPin, Network, NotebookPen, PackagePlus, PanelLeftClose, Phone, Plus, RotateCcw, Search, Settings,
  ShieldCheck, SlidersHorizontal, Trash2, TrendingUp, Upload, UserCheck, UserCog, UserMinus, UserPlus, Users, WalletCards,
  X, ZoomIn, ZoomOut
} from "lucide-react";
import { Bar, BarChart as ReportBarChart, CartesianGrid, Line, LineChart as ReportLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const green = "#018038";
function announce(message, tone="success") { window.dispatchEvent(new CustomEvent("prototype-toast", {detail:{message,tone}})); }

const employees = [
  ["Matilda Ipeh Anashie", "Senior Product Designer", "BLK", "Ghana", "Active", "MA"],
  ["Erwin Llanera", "Recruitment Team Lead", "HR", "Philippines", "Active", "EL"],
  ["Ismail Gorkem Kara", "Head of Product", "BLK", "Türkiye", "Active", "IG"],
  ["Yagnesh Tatmiya", "Flutter & Android Developer", "BLK", "India", "Active", "YT"],
  ["Sharoon Raza", "Director of Sales", "HR-RBS", "Pakistan", "Active", "SR"],
  ["Sneha Gupta", "People Operations Manager", "HR", "India", "Active", "SG"],
  ["Andre Ricardo", "Backend Engineer", "Platform", "Portugal", "Inactive", "AR"],
];
const EMPLOYEE_DIRECTORY=[
    {name:"Abdul Qadir",initials:"AQ",email:"sapphire@must.company",mobile:"+918561914959",department:"BLK",team:"Exchange Service Development Team",title:"Backend Developer",joined:"Sep 15, 2025",dob:"1999-11-29",manager:"Robin Ryu"},
    {name:"Abdul Rehman",initials:"AR",email:"r.abdul@must.company",mobile:"+923342679404",department:"BIC",team:"Content Creation Team",title:"Recruitment Content-Team Leader",joined:"Jun 3, 2024",dob:"1994-06-28",manager:"Ju Hun Cha",status:"On PIP"},
    {name:"Abhi Vishwakarma",initials:"AV",email:"honeystone@must.company",mobile:"+917987156629",department:"BLK",team:"Exchange Service Development Team",title:"Backend Developer",joined:"Apr 6, 2026",dob:"2001-03-24",manager:"—"},
    {name:"Abideen Babatunde Olafimihan",initials:"AB",email:"darkslateblue@must.company",mobile:"+2349130479655",department:"BIC",team:"Global Development Team 2",title:"Frontend Developer (Web Publisher)",joined:"Feb 3, 2025",dob:"1995-12-19",manager:"Terrence Chipuka"},
    {name:"Adaramoye Oluwaseun",initials:"AO",email:"silkdew@must.company",mobile:"+2349131160162",department:"HR",team:"Recruitment Team",title:"Technical Recruiter",joined:"Mar 2, 2026",dob:"1994-03-07",manager:"Erwin Llanera"},
    {name:"Adha Washington",initials:"AW",email:"w.adha@must.company",mobile:"+9203318877598",department:"HR",team:"Recruitment Team",title:"Technical Recruiter",joined:"Apr 22, 2024",dob:"1992-08-14",manager:"Erwin Llanera"},
    {name:"Afolabi Olanrewaju Odurinde",initials:"AO",email:"maize@must.company",mobile:"+2348140397899",department:"BIC",team:"Global Development Team 2",title:"Mobile Developer",joined:"Jun 4, 2025",dob:"—",manager:"Terrence Chipuka"},
    {name:"Afroas Jameela",initials:"AJ",email:"roazy@must.company",mobile:"+94788907894",department:"HR",team:"Customer Service Team",title:"CS Team Leader",joined:"Jul 10, 2022",dob:"—",manager:"—"},
    {name:"Aisha Ghazal",initials:"AG",email:"g.aisha@must.company",mobile:"+923348408908",department:"HR",team:"HR Management Team",title:"HR Management Specialist",joined:"Mar 6, 2023",dob:"—",manager:"Maryam Mansha"},
    {name:"Alia Nazir",initials:"AN",email:"n.alia@must.company",mobile:"+923074300413",department:"HR",team:"Recruitment Operations Team",title:"Recruitment Operations - Team Lead",joined:"Apr 3, 2025",dob:"—",manager:"—",status:"Resigned",separationDate:"May 20, 2026"},
  ];
const PHONE_COUNTRIES=[["+234","Nigeria"],["+94","Sri Lanka"],["+92","Pakistan"],["+91","India"]];
function countryFromMobile(mobile) { const hit=PHONE_COUNTRIES.find(([code])=>mobile.startsWith(code)); return hit?hit[1]:"Other"; }
function hourlyRate(name) { let h=0; for(let i=0;i<name.length;i++) h=(h*31+name.charCodeAt(i))>>>0; return (18+(h%28)).toFixed(2); }
const DEPARTMENTS=[["BIC",84],["MNC",63],["BLK",58],["HR",42],["HQ",18],["FIN",10],["UNASSIGNED",8],["AGN",2],["CEO",1],["VP",1]];
const ACTIVITY_LOG=[
  ["11 Aug 2026, 12:36","AA","Arshman Afzal","Updated","Ri Le Tan's role changed to Admin","User · Ri Le Tan","200","10.8.9.24"],
  ["11 Aug 2026, 12:31","MI","Matilda Ipeh Anashie","Approved","Aisha Bello's Annual Leave","Leave request","200","10.8.9.24"],
  ["11 Aug 2026, 12:29","AA","Arshman Afzal","Logged in","—","—","200","10.8.9.24"],
  ["11 Aug 2026, 12:10","DB","Dilhani Baskaran","Rejected","Kwame Mensah's Compassionate Leave","Leave request","200","10.8.9.24"],
  ["11 Aug 2026, 11:45","S","System","Logged in","—","—","200","10.8.9.24"],
  ["11 Aug 2026, 11:20","RC","Rohma Chaudhary","Viewed","Ethan Walker's salary record","Salary","200","10.8.9.24"],
  ["11 Aug 2026, 11:01","RC","Rohma Chaudhary","Logged in","—","—","200","10.8.9.24"],
  ["11 Aug 2026, 10:54","MI","Matilda Ipeh Anashie","Deleted","Q2 Leadership feedback cycle","Feedback #25a85f61","200","10.8.9.24"],
  ["11 Aug 2026, 09:40","SG","Sneha Gupta","Created","New employee — Priya Nair","Employee","201","10.8.9.24"],
];
const OPEN_POSITIONS=[["Senior Backend Developer","BLK","3 candidates"],["Product Designer","HQ","5 candidates"],["Technical Recruiter","HR","2 candidates"]];
const ANNOUNCEMENTS=[["Q3 all-hands on 20 Aug","All staff","Arshman Afzal","2d ago","Sent"],["New leave policy — Bonus Vacation","All staff","Matilda Ipeh Anashie","5d ago","78% read"],["Office closed — Independence Day","BIC office","Sneha Gupta","1w ago","Sent"],["Welcome new joiners to the team","All staff","Matilda Ipeh Anashie","1w ago","Sent"]];
const DOCUMENT_TEMPLATES=[["Employment Contract","Offer & full-time contract","#E6F4EC","#018038"],["Offer Letter","Candidate offers","#E8F1FF","#1f6feb"],["NDA","Confidentiality agreement","#F1EAFB","#7c3aed"],["Experience Letter","On request / exit","#FFF4E5","#b9770e"],["Salary Certificate","Bank & visa letters","#FDEAEA","#c0392b"],["Warning Letter","HR disciplinary","#FDECEC","#d64545"]];
const COMPANY_DOCUMENTS=[["Employee Handbook 2026","PDF · 4.2 MB · all staff","Published"],["Code of Conduct","Requires annual acknowledgement","92% signed"],["Data Privacy Policy","PDF · all staff","Published"]];
const LONGEST_TENURED=[["Woojeong Lee","HR","5y 8m"],["KangMoon Lee","BIC","5y 1m"],["NaLe Sun","FIN","5y 0m"],["Lee Suk Jeong","MNC","4y 7m"]];

const teams = `
Account Executive (Services) Team|BIC-AGN-SALES-AES|MA,MJ,IQ,HK|4|Mehreen
Agency Dep.|BIC-AGN|KL,HL,HY,SE,+2|6|KangMoon
AI Team|BIC-AGN-AI|KJ,SJ,JJ,JH,+1|5|—
AI Transformation Team|HQ-AX|HK|1|HongBum
AI Video Studio|MNC-MDC-AVST|KO,SL,SM,JH,+6|10|Kyunghyun
App Team|BLK-STG-APP|UA,MS,YT,MF|4|Muhammad
AX Booster Team|BLK-AXB|WP,MZ|2|—
AX Support Office|MNC-AXS|JW,JJ,GY|3|—
Backend Team|BLK-STG-BCK|IA,GD,OS,MR,+4|8|K
Beauty Team|MNC-CMR-BTY|SP,SJ,JY,YR,+1|5|—
Blockchain Team|BLK-TSL-CHAIN|NN,SR,LG,MR,+1|5|—
Commerce Dep.|MNC-CMR|KB|1|Kim
Company Brand Strategy Team|HQ-VSD-CBS|YI,YL|2|Youngjoon
Company Culture Institute|HQ-VSD-CCI|AM|1|Amir
Company PR Team|HQ-VSD-CPR|JK|1|—
Company Strategy Planning Team|HQ-SPD-CSP|SS,DA,IS|3|Iqra
Content Creation Team|BIC-CCT|JO,AM,AR,FH,+1|5|Abdul
Contents Studio|MNC-MDC-CNTS|CS|1|Choi
Contents Team|MNC-SRR-CONT|NP,PP,PP|3|Natchar
Creative Design Team|FIN-FCD|YH,HB,NS|3|Hyunji
Crew Video Studio|MNC-PFC-CVS|KD,KM|2|Kim
Customer Service Team|HR-TMD-CS|JA,AJ,MF,WL,+3|7|Afroas
CX Team|BIC-AGN-CX|JP,DK,YH,PR,+3|7|Dohee
Design Dep.|BIC-DGN|CL,YK,DL,SU,+3|7|Hyeong
DevOps Team|BLK-DOPS|RL,MH,NG|3|Ri
E-Commerce Team|MNC-CMR-ECM|HU|1|Hyun
Entertainment Video Studio|MNC-PFC-EVS|SN,JY,SW,JY,+8|12|Cho
Exchange Service Development Team|BLK-XSG-XDV|AQ,RE,TE,SS,+5|9|—
Exchange Service Group|BLK-XSG|RR|1|—
Finance Strategy Dep.|HQ-FSD|YH|1|—
Finance Team|HQ-FSD-FNCE|LL,MZ,SS,MU,+2|6|Elma
Food & Beverage Dep|MNC-FNB|YS|1|Yongjong
Global Development Team 1|BIC-AGN-GD1|HZ,MY,GS,DK,+3|7|Dayan
Global Development Team 2|BIC-AGN-GD2|GO,DP,AE,UF,+7|11|Terrence
HR Management Team|HR-TMD-HRM|SR,BD,AS,AA,+5|9|Maryam
HR Strategy Planning Team|HR-SPT|IA,TS|2|Tooba
Human Resources Div.|HR|HO|1|Hwan
Korea Region Team|HR-RBS-KR|EH,HS,JA,SA,+1|5|Woojeong
Local Business Team|BIC-CLB-LBT|TH,HJ|2|Ha-nul
Management Team|MNC-SRR-MGM|NI,NY|2|—
Marketing Dep.|MNC-MKT|LS|1|Lee
Marketing team|MNC-SRR-RMKT|AP,AP|2|—
Marketing Team|MNC-FNB-BRND-FBMKT|DL|1|—
Markup & QA Engineering Team|FIN-FQA|SS|1|Sangjun
Media Contents Dep.|MNC-MDC|ST|1|Shin
MOAD Development Team|BLK-MOAD-MDEV|YC,MF,JE,HT,+5|9|—
MOAD Labs|BLK-MOAD-MLAB|CI,SS|2|—
MOAD Operation Team|BLK-MOAD-MOPT|WP,YH,SL|3|Yun
MOAD Sales Team|BLK-MOAD-MSLS|MG,KD|2|—
MOAD Team|BLK-MOAD|JP|1|JooCheol
Mongolia Region Team|HR-RBS-MN|TG|1|Tserendulam
Operation & Admin Team|BLK-STG-OAM|SS,NA,MF,NA,+1|5|Nadir
Operation Team|MNC-SRR-ROPT|TT,TS|2|—
Operation Team|MNC-MKT-MOP|JH,HJ,JH,CH,+4|8|Jeong
Operation Team|MNC-FNB-BRND-FBOPS|HS,SS|2|Soochul
Platform Contents Dep.|MNC-PFC|DS|1|Da
Pre-Sales & Consulting Team|FIN-PSC|MK,KK,DH|3|Do
President|CEO|JH|1|Ju
Purchasing Procurement Team|HQ-FSD-PPT|TH|1|Tae
QA Team|AGN-AQA|NK|1|—
R&D Office|MNC-FNB-RDO|YJ,CM,SY|3|Choi
Recruitment Operations Team|HR-TAD-RCOPS|SS,AN,MM,OA|4|Alia
Recruitment Team|HR-TAD-RCRT|AO,EM,JP,EA,+5|9|Erwin
Sales Dep.|BIC-AGN-SALES|SR,SM,MA|3|Sharoon
Sales Development Team|BIC-AGN-SALES-SDT|ZU,JK,AB,ZA,+1|5|Shahnawaz
SEA Region Retail Dep.|MNC-SRR|YC|1|Yeong
Solutions Architecture Team|BIC-AGN-SALES-SA|SP,AE,AA|3|—
Space Business Team|BIC-CLB-SBT|JM,HL|2|Hojune
Strategy Planning Dep.|HQ-SPD|SY|1|Seung
Strategy Planning Team|FIN-FSP|JH,KH,JM|3|—
Super Trust Group|BLK-STG|IG|1|Ismail
Talent Onboarding Team|HR-TMD-ONB|MZ,MZ,MR,SA|4|Mehak
Tech Audit & Security Lab|BLK-TSL|OH|1|—
Technical Team|BIC-AGN-TECH|HU,HS,SS,DM,+13|17|Muhammad
UX Planning Team|AGN-UXP|HK|1|—
UX/UI Team|BLK-UXI|SG,MI|2|Matilda
Value Strategy Dep.|HQ-VSD|YJ|1|YoungSang
Vice President|VP|KH|1|Kim
`.trim().split("\n").map((line,index)=>{const [name,code,avatars,count,leader]=line.split("|");return {name,code,avatars:avatars.split(","),count:Number(count),leader,index};});

const KST = "13:00 ~ 22:00 (KST)";

// Full leave/request records — preserves the depth seen in the live HRIS (dates, time, timezone,
// hours, balance impact, overlap, multi-stage progress and a timestamped decision history) so
// employee cards, team-lead approval cards and their detail views can all read from one source.
const LEAVE_REQUESTS = [
  {id:"lv-1", employee:"Aisha Bello", initials:"AB", team:"Exchange Service Development Team", teamCode:"BLK-XSG",
    type:"Annual Leave", tone:"green", dates:"Aug 17 – Aug 21, 2026", time:"09:00 – 17:00", timezone:KST, hours:"40h",
    reason:"Family holiday", submitted:"Aug 11, 2026", manager:"Matilda Ipeh Anashie", stage:"Manager", status:"Pending",
    attachments:0, balanceBefore:"12 days", balanceAfter:"7 days", overlap:"Neha Sharma · Aug 17–19",
    progress:[{label:"Applied",tone:"done"},{label:"Manager",tone:"pending"},{label:"HR",tone:"upcoming"}],
    history:[
      {label:"Applied", detail:"by Aisha Bello", time:"Aug 11, 2026, 14:20", tone:"done"},
      {label:"Pending", detail:"waiting for Matilda Ipeh Anashie", time:"Manager stage", tone:"pending"},
    ]},
  {id:"lv-2", employee:"Daniel Kim", initials:"DK", team:"Commerce Dep.", teamCode:"MNC-CMR",
    type:"Sick Leave", tone:"red", dates:"Aug 12, 2026", time:"09:00 – 17:00", timezone:KST, hours:"8h",
    reason:"Flu, resting per doctor's note", submitted:"Aug 11, 2026", manager:"Sneha Gupta", stage:"Done", status:"Approved",
    attachments:1, balanceBefore:"10 days", balanceAfter:"9 days", overlap:null,
    progress:[{label:"Applied",tone:"done"},{label:"Manager",tone:"done"},{label:"HR",tone:"done"}],
    history:[
      {label:"Applied", detail:"by Daniel Kim", time:"Aug 11, 2026, 08:02", tone:"done"},
      {label:"Approved", detail:"at Manager stage by Sneha Gupta", time:"Aug 11, 2026, 08:40", tone:"done"},
      {label:"Approved", detail:"at HR stage by Dilhani Baskaran", time:"Aug 11, 2026, 09:15", tone:"done"},
    ], acknowledged:{by:"HR", time:"Aug 11, 2026, 09:20"}},
  {id:"lv-3", employee:"Neha Sharma", initials:"NS", team:"Exchange Service Development Team", teamCode:"BLK-XSG",
    type:"Annual Leave", tone:"green", dates:"Aug 24 – Aug 28, 2026", time:"09:00 – 17:00", timezone:KST, hours:"40h",
    reason:"Pre-booked family trip", submitted:"Aug 9, 2026", manager:"Matilda Ipeh Anashie", stage:"HR", status:"Pending",
    attachments:0, balanceBefore:"15 days", balanceAfter:"10 days", overlap:"Aisha Bello · Aug 17–19 · adjacent leave",
    progress:[{label:"Applied",tone:"done"},{label:"Manager",tone:"done"},{label:"HR",tone:"pending"}],
    history:[
      {label:"Applied", detail:"by Neha Sharma", time:"Aug 9, 2026, 10:15", tone:"done"},
      {label:"Approved", detail:"at Manager stage by Matilda Ipeh Anashie", time:"Aug 9, 2026, 15:02", tone:"done"},
      {label:"Pending", detail:"waiting for HR", time:"HR stage", tone:"pending"},
    ]},
  {id:"lv-4", employee:"Kwame Mensah", initials:"KM", team:"Customer Service Team", teamCode:"HR-TMD-CS",
    type:"Compassionate Leave", tone:"pink", dates:"Jul 30 – Jul 31, 2026", time:"09:00 – 17:00", timezone:KST, hours:"16h",
    reason:"Bereavement — immediate family", submitted:"Jul 28, 2026", manager:"Matilda Ipeh Anashie", stage:"Done", status:"Rejected",
    attachments:1, balanceBefore:"5 days", balanceAfter:"5 days", overlap:null,
    progress:[{label:"Applied",tone:"done"},{label:"Manager",tone:"done"},{label:"HR",tone:"rejected"}],
    history:[
      {label:"Applied", detail:"by Kwame Mensah", time:"Jul 28, 2026, 09:10", tone:"done"},
      {label:"Approved", detail:"at Manager stage by Matilda Ipeh Anashie", time:"Jul 28, 2026, 11:00", tone:"done"},
      {label:"Rejected", detail:"at HR stage by Dilhani Baskaran", time:"Jul 29, 2026, 08:44", tone:"rejected",
        note:"The attached document doesn't match the stated relationship. Please re-submit with a supporting document and the correct relationship, or contact HR directly."},
    ]},
  {id:"lv-5", employee:"Sara Ahmed", initials:"SA", team:"Strategy Planning Team", teamCode:"FIN-FSP",
    type:"Annual Leave", tone:"green", dates:"Sep 7 – Sep 11, 2026", time:"09:00 – 17:00", timezone:KST, hours:"40h",
    reason:"Personal travel", submitted:"Jul 20, 2026", manager:"—", stage:"Done", status:"Cancelled",
    attachments:0, balanceBefore:"9 days", balanceAfter:"9 days", overlap:null, progress:null,
    history:[
      {label:"Applied", detail:"by Sara Ahmed", time:"Jul 20, 2026, 13:30", tone:"done"},
      {label:"Approved", detail:"at Manager stage", time:"Jul 21, 2026, 09:00", tone:"done"},
      {label:"Cancelled", detail:"by Sara Ahmed, before the leave started", time:"Aug 2, 2026, 16:10", tone:"cancelled",
        note:"Trip postponed — will reapply for new dates."},
    ]},
  {id:"lv-6", employee:"Matilda Ipeh Anashie", initials:"MI", team:"UX/UI Team", teamCode:"BLK-UXI",
    type:"Vacation Leave (VL)", tone:"purple", dates:"May 4 – May 8, 2026", time:"09:00 – 17:00", timezone:KST, hours:"40h",
    reason:"Personal time off", submitted:"Apr 20, 2026", manager:"Lion Cho Chung Hyun", stage:"Done", status:"Expired",
    attachments:0, balanceBefore:"3 days", balanceAfter:"3 days", overlap:null, progress:null,
    history:[
      {label:"Applied", detail:"by Matilda Ipeh Anashie", time:"Apr 20, 2026, 11:05", tone:"done"},
      {label:"Expired", detail:"not decided by the manager before the requested dates passed", time:"May 4, 2026", tone:"expired",
        note:"This request expired before a decision was made. Reapply with new dates if the leave is still needed."},
    ]},
];

// Catalog shown in the employee-facing Apply for Leave picker — mirrors the live HRIS's
// per-type policy summary, entitlement, unit and live balance.
const LEAVE_TYPES = [
  {key:"annual", name:"Annual Leaves", tone:"green", icon:CalendarDays, paid:true, entitlement:"96h/year", unit:"4h units", balance:"76h left", leftHours:76, totalHours:96,
    policy:"Employees are entitled to annual paid leave based on their employment category, MF/MS. These leave entitlements become available only after the successful completion of the employee's probation period. For employees who join the organization mid-year, leave entitlement is calculated on a pro rata basis, depending on the number of remaining months in the calendar year following completion of probation. MS – 15 days · MF – 12 days."},
  {key:"bvl", name:"Bonus Vacation Leave (BVL)", tone:"blue", icon:PackagePlus, paid:true, entitlement:"32h/year", unit:"any duration", balance:"0h left", leftHours:0, totalHours:32,
    policy:"Regular full-time employees who have completed probation may earn Bonus Vacation Leave (BVL) as a reward for consistent attendance and compliance with company policies. Employees who achieve 100% attendance, with no unpaid/short leave and no policy violations, may receive 4 days of BVL. These leaves cannot be combined with any other leave."},
  {key:"family", name:"Family Leave", tone:"pink", icon:Users, paid:true, entitlement:"40h/year", unit:"any duration", balance:"40h left", leftHours:40, totalHours:40,
    policy:"Eligible regular employees may take up to 5 consecutive days of paid Family Leave for their own marriage, serious illness of an immediate family member, or bereavement. Planned events require advance notice and supporting documents. Leave must be taken in full-day increments and is subject to approval and operational requirements."},
  {key:"maternity", name:"Maternity Leave", tone:"blue", icon:UserPlus, paid:true, entitlement:"360h/year", unit:"any duration", balance:"360h left", leftHours:360, totalHours:360,
    policy:"Full-time regular female employees with at least one year of service are entitled to 1.5 months (45 calendar days) of paid maternity leave upon providing a medical certificate. The leave can commence up to five days before the expected delivery date. If medically justified, an employee may request additional unpaid leave, subject to management and HR approval; the paid leave is non-convertible to cash."},
  {key:"ot", name:"Overtime (OT)", tone:"amber", icon:Clock3, paid:true, entitlement:"Unlimited", unit:"any duration", balance:"Unlimited", unlimited:true,
    policy:"The purpose of overtime is to meet urgent demands, additional workloads and critical deadlines, or to handle emergencies and peak operational hours. This policy outlines the terms under which employees may be required or allowed to work beyond regular hours, ensuring fair compensation and regulatory compliance. The maximum duration for regular overtime is 3 hours, and it must always be requested and approved before the work is performed — it cannot be applied for after the fact."},
  {key:"pto", name:"Paid Time Off (PTO)", tone:"purple", icon:BriefcaseBusiness, paid:true, entitlement:"Unlimited", unit:"any duration", balance:"Unlimited", unlimited:true,
    policy:"PTO is designated for work-related scenarios where time cannot be logged through the timer application — official travel or work conducted outside the office for company business (client meetings, site visits), and attendance at company-organized events, seminars or training sessions. PTO must be applied for in advance or on the day it is being taken; late submissions are not permitted. Eligibility: all full-time employees."},
  {key:"holiday", name:"Public Holiday", tone:"green", icon:Landmark, paid:true, entitlement:"120h/year", unit:"any duration", balance:"48h left", leftHours:48, totalHours:120,
    policy:"Full-time employees who have completed their probation are entitled to 15 paid public holidays annually. Employees with less than one year of tenure must also have achieved at least 80% attendance in the previous month to be eligible; this requirement is waived for employees with one year or more of service."},
  {key:"tenure", name:"Tenure leave", tone:"blue", icon:Crown, paid:true, entitlement:"40h/year", unit:"any duration", balance:"8h left", leftHours:8, totalHours:40,
    policy:"Tenure Leave is an additional paid leave granted to employees on the anniversary of their employment as recognition of their continued service. Employees become eligible after completing one full year of service. The leave is provided incrementally according to completed years of service, starting from 1 day after the first year and increasing up to a maximum of 5 days after five or more years of service."},
  {key:"uto", name:"Unpaid Time Off (UTO)", tone:"red", icon:FileText, paid:false, entitlement:"Unlimited", unit:"any duration", balance:"Unlimited", unlimited:true,
    policy:"Monday–Friday employees have a monthly limit of 8 hours; Monday–Saturday employees, 16 hours. Consecutive unpaid leave is not allowed by default, and requests for more than 2 unpaid days (16 hours) must be approved by the Business Head or higher. UTO is available only after Annual Leave has been exhausted, and employees must provide a valid reason for the absence."},
  {key:"vl", name:"Vacation Leave (VL)", tone:"blue", icon:WalletCards, paid:true, entitlement:"24h/year", unit:"any duration", balance:"24h left", leftHours:24, totalHours:24,
    policy:"Regular full-time employees who have completed probation may earn Vacation Leave (VL) as a reward for consistent attendance and compliance with company policies. Eligible employees may receive 3 days of VL for maintaining at least 90% attendance, using less than 10% unpaid/short leave, and having no policy violations during a calendar year. These leaves cannot be combined with any other leave."},
];

const REQUEST_TYPES = [
  {key:"asset", name:"Asset / Equipment Request", summary:"Asset / Equipment Request", approval:"Manager → Finance Team → HR", tone:"pink", fieldLabel:"Asset / equipment request"},
  {key:"finance", name:"Finance Document Request", summary:"Salary Slips/Tax Certificate", approval:"Manager → Finance Team", tone:"blue", fieldLabel:"Finance document request"},
  {key:"general", name:"General Operational Request", summary:"General Operational Request", approval:"Manager → HR", tone:"blue", fieldLabel:"General operational request"},
  {key:"hr-doc", name:"HR Document Request", summary:"Employment/Experience Letter Request", approval:"Manager → HR", tone:"teal", fieldLabel:"Employment/experience letter request"},
  {key:"policy", name:"Policy Clarification Request", summary:"Policy Clarification Request", approval:"HR", tone:"green", fieldLabel:"Policy clarification request"},
  {key:"profile", name:"Profile Update Request", summary:"Profile Update Request", approval:"HR", tone:"amber", fieldLabel:"Profile update request"},
  {key:"shift", name:"Shift Management Request", summary:"Shift Management Request", approval:"Manager → HR", tone:"amber", fieldLabel:"Shift management request"},
  {key:"wfh", name:"Work From Home Request", summary:"Work From Home Request", approval:"Manager → HR → Hwan Oh", tone:"blue", fieldLabel:"Work from home request"},
];

const REQUESTS = [
  {id:"rq-1", employee:"Ismail Gorkem Kara", initials:"IG", team:"Super Trust Group", teamCode:"BLK-STG",
    type:"Asset / Equipment Request", approvalChain:"Manager → Finance Team → HR",
    summary:"MacBook replacement", answers:[["Asset / equipment request","MacBook Pro 14\" — current device has repeated battery failures"]],
    submitted:"Aug 11, 2026", manager:"Arshman Afzal", stage:"Finance Team", status:"Pending", attachments:1,
    progress:[{label:"Applied",tone:"done"},{label:"Manager",tone:"done"},{label:"Finance",tone:"pending"},{label:"HR",tone:"upcoming"}],
    history:[
      {label:"Applied", detail:"by Ismail Gorkem Kara", time:"Aug 11, 2026, 10:04", tone:"done"},
      {label:"Approved", detail:"at Manager stage by Arshman Afzal", time:"Aug 11, 2026, 11:20", tone:"done"},
      {label:"Pending", detail:"waiting for Finance Team", time:"Finance stage", tone:"pending"},
    ]},
  {id:"rq-2", employee:"Matilda Ipeh Anashie", initials:"MI", team:"UX/UI Team", teamCode:"BLK-UXI",
    type:"Work From Home Request", approvalChain:"Manager → HR → Hwan Oh",
    summary:"Remote on Aug 14, 2026", answers:[["Work from home date","Aug 14, 2026"],["Reason","Apartment maintenance appointment"]],
    submitted:"Aug 10, 2026", manager:"Lion Cho Chung Hyun", stage:"Done", status:"Approved", attachments:0,
    progress:[{label:"Applied",tone:"done"},{label:"Manager",tone:"done"},{label:"HR",tone:"done"},{label:"Hwan Oh",tone:"done"}],
    history:[
      {label:"Applied", detail:"by Matilda Ipeh Anashie", time:"Aug 10, 2026, 09:12", tone:"done"},
      {label:"Approved", detail:"at Manager stage by Lion Cho Chung Hyun", time:"Aug 10, 2026, 09:40", tone:"done"},
      {label:"Approved", detail:"at HR stage by Dilhani Baskaran", time:"Aug 10, 2026, 14:02", tone:"done"},
      {label:"Acknowledged", detail:"by Hwan Oh", time:"Aug 11, 2026, 08:15", tone:"done"},
    ]},
  {id:"rq-3", employee:"Aisha Bello", initials:"AB", team:"Exchange Service Development Team", teamCode:"BLK-XSG",
    type:"HR Document Request", approvalChain:"Manager → HR",
    summary:"Employment letter for visa application", answers:[["Employment/experience letter request","Employment verification letter needed for a UK visa application, addressed to the British High Commission"]],
    submitted:"Aug 8, 2026", manager:"Matilda Ipeh Anashie", stage:"HR", status:"Pending", attachments:1,
    progress:[{label:"Applied",tone:"done"},{label:"Manager",tone:"done"},{label:"HR",tone:"pending"}],
    history:[
      {label:"Applied", detail:"by Aisha Bello", time:"Aug 8, 2026, 16:30", tone:"done"},
      {label:"Approved", detail:"at Manager stage by Matilda Ipeh Anashie", time:"Aug 8, 2026, 17:05", tone:"done"},
      {label:"Pending", detail:"waiting for HR preparation", time:"HR stage", tone:"pending"},
    ]},
  {id:"rq-4", employee:"Daniel Kim", initials:"DK", team:"Commerce Dep.", teamCode:"MNC-CMR",
    type:"General Operational Request", approvalChain:"Manager → HR",
    summary:"Travel request — Seoul product workshop", answers:[["General operational request","Approval to travel to Seoul HQ for the product workshop, Aug 18–20"]],
    submitted:"Aug 5, 2026", manager:"Sneha Gupta", stage:"Done", status:"Rejected", attachments:0, progress:null,
    history:[
      {label:"Applied", detail:"by Daniel Kim", time:"Aug 5, 2026, 09:00", tone:"done"},
      {label:"Rejected", detail:"at Manager stage by Sneha Gupta", time:"Aug 5, 2026, 13:40", tone:"rejected",
        note:"Budget for this workshop is already covered by two attendees from Commerce. Please coordinate with them to share notes instead."},
    ]},
  {id:"rq-5", employee:"Kwame Mensah", initials:"KM", team:"Customer Service Team", teamCode:"HR-TMD-CS",
    type:"Finance Document Request", approvalChain:"Manager → Finance Team",
    summary:"Salary slip — Jan to Jun 2026", answers:[["Finance document request","6 months of salary slips for a mortgage application"]],
    submitted:"Jul 2, 2026", manager:"—", stage:"Done", status:"Cancelled", attachments:0, progress:null,
    history:[
      {label:"Applied", detail:"by Kwame Mensah", time:"Jul 2, 2026, 10:00", tone:"done"},
      {label:"Cancelled", detail:"by Kwame Mensah", time:"Jul 3, 2026, 08:12", tone:"cancelled", note:"Mortgage application withdrawn."},
    ]},
  {id:"rq-6", employee:"Sara Ahmed", initials:"SA", team:"Strategy Planning Team", teamCode:"FIN-FSP",
    type:"Shift Management Request", approvalChain:"Manager → HR",
    summary:"Swap Aug 22 shift with a teammate", answers:[["Shift management request","Swap my Aug 22 evening shift with Yusuf's morning shift — already agreed between us"]],
    submitted:"Jun 30, 2026", manager:"—", stage:"Done", status:"Expired", attachments:0, progress:null,
    history:[
      {label:"Applied", detail:"by Sara Ahmed", time:"Jun 30, 2026, 17:45", tone:"done"},
      {label:"Expired", detail:"not decided by the manager before the shift date passed", time:"Aug 22, 2026", tone:"expired",
        note:"This request expired before a decision was made. Reapply if the change is still needed."},
    ]},
];

// The signed-in employee's (Matilda Ipeh Anashie) own leave and request history for My Leaves / My
// Requests — separate from the team's queue above so status variety (Pending/Approved/Rejected/
// Expired) is guaranteed regardless of what a team lead happens to be reviewing.
const MY_LEAVES = [
  {id:"my-lv-1", employee:"Matilda Ipeh Anashie", initials:"MI", team:"UX/UI Team", teamCode:"BLK-UXI",
    type:"Annual Leave", tone:"green", dates:"Aug 24 – Aug 26, 2026", time:"09:00 – 17:00", timezone:KST, hours:"24h",
    reason:"Long weekend trip", submitted:"Aug 12, 2026", manager:"Lion Cho Chung Hyun", stage:"Manager", status:"Pending",
    attachments:0, balanceBefore:"9.5 days", balanceAfter:"6.5 days", overlap:null,
    progress:[{label:"Applied",tone:"done"},{label:"Manager",tone:"pending"},{label:"HR",tone:"upcoming"}],
    history:[
      {label:"Applied", detail:"by Matilda Ipeh Anashie", time:"Aug 12, 2026, 09:40", tone:"done"},
      {label:"Pending", detail:"waiting for Lion Cho Chung Hyun", time:"Manager stage", tone:"pending"},
    ]},
  {id:"my-lv-2", employee:"Matilda Ipeh Anashie", initials:"MI", team:"UX/UI Team", teamCode:"BLK-UXI",
    type:"Public Holiday", tone:"green", dates:"Aug 14, 2026", time:"09:00 – 17:00", timezone:KST, hours:"8h",
    reason:"Independence Day Holiday", submitted:"Aug 10, 2026", manager:"Lion Cho Chung Hyun", stage:"Done", status:"Approved",
    attachments:0, balanceBefore:"9 days", balanceAfter:"6 days", overlap:null,
    progress:[{label:"Applied",tone:"done"},{label:"Manager",tone:"done"},{label:"HR",tone:"done"}],
    history:[
      {label:"Applied", detail:"by Matilda Ipeh Anashie", time:"Aug 10, 2026, 08:00", tone:"done"},
      {label:"Approved", detail:"at Manager stage by Lion Cho Chung Hyun", time:"Aug 10, 2026, 08:16", tone:"done"},
      {label:"Approved", detail:"at HR stage", time:"Aug 13, 2026, 06:29", tone:"done"},
    ], acknowledged:{by:"HR", time:"Aug 13, 2026, 04:07"}},
  {id:"my-lv-3", employee:"Matilda Ipeh Anashie", initials:"MI", team:"UX/UI Team", teamCode:"BLK-UXI",
    type:"Overtime (OT)", tone:"amber", dates:"Aug 6, 2026", time:"21:00 – 23:00", timezone:KST, hours:"2h",
    reason:"Demo UI design work for a client deliverable", submitted:"Aug 6, 2026", manager:"Lion Cho Chung Hyun", stage:"Done", status:"Rejected",
    attachments:0, balanceBefore:"Unlimited", balanceAfter:"Unlimited", overlap:null,
    progress:[{label:"Applied",tone:"done"},{label:"Manager",tone:"done"},{label:"HR",tone:"rejected"}],
    history:[
      {label:"Applied", detail:"by Matilda Ipeh Anashie", time:"Aug 6, 2026, 17:02", tone:"done"},
      {label:"Approved", detail:"at Manager stage by Lion Cho Chung Hyun", time:"Aug 6, 2026, 17:03", tone:"done"},
      {label:"Rejected", detail:"at HR stage", time:"Aug 7, 2026, 04:00", tone:"rejected",
        note:"Under our OT policy, overtime must always be requested and approved before the work is performed. As the work had already started when you applied, this request cannot be approved retroactively — please submit and get approval in advance next time."},
    ]},
  {id:"my-lv-4", employee:"Matilda Ipeh Anashie", initials:"MI", team:"UX/UI Team", teamCode:"BLK-UXI",
    type:"Vacation Leave (VL)", tone:"purple", dates:"May 4 – May 8, 2026", time:"09:00 – 17:00", timezone:KST, hours:"40h",
    reason:"Personal time off", submitted:"Apr 20, 2026", manager:"Lion Cho Chung Hyun", stage:"Done", status:"Expired",
    attachments:0, balanceBefore:"3 days", balanceAfter:"3 days", overlap:null, progress:null,
    history:[
      {label:"Applied", detail:"by Matilda Ipeh Anashie", time:"Apr 20, 2026, 11:05", tone:"done"},
      {label:"Expired", detail:"not decided by the manager before the requested dates passed", time:"May 4, 2026", tone:"expired",
        note:"This request expired before a decision was made. Reapply with new dates if the leave is still needed."},
    ]},
];

const MY_REQUESTS = [
  {id:"my-rq-1", employee:"Matilda Ipeh Anashie", initials:"MI", team:"UX/UI Team", teamCode:"BLK-UXI",
    type:"HR Document Request", approvalChain:"Manager → HR",
    summary:"Employment letter for a bank reference", answers:[["Employment/experience letter request","Standard employment verification letter needed for a personal bank reference"]],
    submitted:"Aug 9, 2026", manager:"Lion Cho Chung Hyun", stage:"HR", status:"Pending", attachments:0,
    progress:[{label:"Applied",tone:"done"},{label:"Manager",tone:"done"},{label:"HR",tone:"pending"}],
    history:[
      {label:"Applied", detail:"by Matilda Ipeh Anashie", time:"Aug 9, 2026, 11:12", tone:"done"},
      {label:"Approved", detail:"at Manager stage by Lion Cho Chung Hyun", time:"Aug 9, 2026, 13:00", tone:"done"},
      {label:"Pending", detail:"waiting for HR preparation", time:"HR stage", tone:"pending"},
    ]},
  {id:"my-rq-2", employee:"Matilda Ipeh Anashie", initials:"MI", team:"UX/UI Team", teamCode:"BLK-UXI",
    type:"Work From Home Request", approvalChain:"Manager → HR → Hwan Oh",
    summary:"Remote on Aug 14, 2026", answers:[["Work from home date","Aug 14, 2026"],["Reason","Apartment maintenance appointment"]],
    submitted:"Aug 10, 2026", manager:"Lion Cho Chung Hyun", stage:"Done", status:"Approved", attachments:0,
    progress:[{label:"Applied",tone:"done"},{label:"Manager",tone:"done"},{label:"HR",tone:"done"},{label:"Hwan Oh",tone:"done"}],
    history:[
      {label:"Applied", detail:"by Matilda Ipeh Anashie", time:"Aug 10, 2026, 09:12", tone:"done"},
      {label:"Approved", detail:"at Manager stage by Lion Cho Chung Hyun", time:"Aug 10, 2026, 09:40", tone:"done"},
      {label:"Approved", detail:"at HR stage", time:"Aug 10, 2026, 14:02", tone:"done"},
      {label:"Acknowledged", detail:"by Hwan Oh", time:"Aug 11, 2026, 08:15", tone:"done"},
    ]},
  {id:"my-rq-3", employee:"Matilda Ipeh Anashie", initials:"MI", team:"UX/UI Team", teamCode:"BLK-UXI",
    type:"Asset / Equipment Request", approvalChain:"Manager → Finance Team → HR",
    summary:"Second monitor for the design desk", answers:[["Asset / equipment request","24\" second monitor to support side-by-side design review"]],
    submitted:"Jul 15, 2026", manager:"—", stage:"Done", status:"Cancelled", attachments:0, progress:null,
    history:[
      {label:"Applied", detail:"by Matilda Ipeh Anashie", time:"Jul 15, 2026, 10:20", tone:"done"},
      {label:"Cancelled", detail:"by Matilda Ipeh Anashie", time:"Jul 16, 2026, 09:05", tone:"cancelled", note:"Found a spare monitor within the team — no longer needed."},
    ]},
];

const routeMeta = {
  "/my-dashboard": ["My Dashboard", "My Dashboard", "Your HR workspace"],
  "/my-profile": ["My Profile", "My Profile", "Your employee profile"],
  "/my-salary": ["My Salary", "My Salary", "Your salary records"],
  "/my-documents": ["My Documents", "My Documents", "Your employee documents"],
  "/my-team": ["My Team", "My Team", "Your team and reporting line"],
  "/my-feedbacks": ["My Feedback", "My Feedback", "Your feedback activity"],
  "/my-leaves": ["My Leaves", "My Leaves", "Your leave requests"],
  "/leave-holidays": ["Leave & Holidays", "Leave & Holidays", "Your leave balances, public holidays and team on leave"],
  "/requests": ["Requests", "Requests", "Your Employee Services requests"],
  "/approvals": ["Approvals", "Approvals", "Requests awaiting your decision"],
  "/sops": ["SOPs & Policies", "SOPs & Policies", "Company standard operating procedures and policies"],
  "/decision-history": ["Decision History", "Decision History", "Your past approval decisions"],
  "/dashboard": ["Overview", "Welcome back", "Here's what's happening with your team"],
  "/settings": ["Settings", "Settings", "Organization structure, policies, and access & security"],
  "/employees": ["Employees", "Employees", "Manage employee records and employment details"],
  "/teams": ["Teams", "Teams", "Manage teams and reporting structures"],
  "/assets": ["Assets", "Assets", "Manage company assets and assignments"],
  "/org-chart": ["Organization Chart", "Organization Chart", "View and manage your reporting structure"],
  "/announcements": ["Announcements", "Announcements", "Broadcast updates to the whole company or specific teams"],
  "/documents": ["Documents & Templates", "Documents & Templates", "Company templates and org-wide document management"],
  "/reports": ["Reports", "Reports", "View HR analytics and workforce insights"],
  "/feedbacks": ["Feedback Cycles", "Feedback Cycles", "Create and manage employee feedback cycles"],
  "/leaves": ["Leave Management", "Leave Management", "Review and manage employee leave requests"],
  "/leave-balances": ["Leave Balances", "Leave Balances", "View and adjust employee leave balances"],
  "/all-requests": ["All Employee Services Requests", "All Employee Services Requests", "Track and manage employee requests"],
  "/settings/users": ["Users & Roles", "Users & Roles", "Manage user access, roles and permissions"],
  "/settings/departments": ["Departments", "Departments", "Manage company departments"],
  "/settings/company-entities": ["Company Entities", "Company Entities", "Manage legal entities and locations"],
  "/settings/leave-types": ["Leave Types", "Leave Types", "Configure leave policies and allowances"],
  "/settings/request-types": ["Request Types", "Request Types", "Configure Employee Services request workflows"],
  "/settings/feedback-forms": ["Feedback Forms", "Feedback Forms", "Build reusable feedback questionnaires"],
  "/activity-logs": ["Activity Logs", "Activity Logs", "Review user and system activity"],
  "/feedback-form-builder": ["Feedback Form", "Feedback Form", "Build sections and questions for this feedback form"],
  "/settings/platform": ["Platform Settings", "Platform Settings", "Manage super admins and platform health"],
};

const navGroups = [
  ["Home", [
    ["Dashboard", "/dashboard", LayoutDashboard],
  ]],
  ["People", [
    ["Employee Directory", "/employees", Users], ["Announcements", "/announcements", Megaphone], ["Feedback Cycles", "/feedbacks", MessageSquareText],
  ]],
  ["Requests", [
    ["Leave & Requests", "/leaves", CalendarDays],
  ]],
  ["Assets & Documents", [
    ["Assets", "/assets", Boxes], ["Documents", "/documents", FileText],
  ]],
  ["Reports", [
    ["Reports", "/reports", BarChart3],
  ]],
  ["My Space", [
    ["My Profile", "/my-profile", UserCog],
    ["My Team", "/my-team", Users], ["My Leaves & Requests", "/my-leaves", CalendarDays],
  ]],
  ["Settings", [
    ["Settings", "/settings", Settings],
  ]],
];

const PREVIEW_NAV_GROUPS_EMPLOYEE = [
  ["Home", [
    ["Dashboard", "/my-dashboard", LayoutDashboard],
  ]],
  ["My Space", [
    ["My Profile", "/my-profile", UserCog],
    ["My Team", "/my-team", Users],
    ["My Leaves & Requests", "/my-leaves", CalendarDays],
  ]],
  ["Resources", [
    ["SOPs & Policies", "/sops", NotebookPen],
  ]],
];
const PREVIEW_NAV_GROUPS_TEAM_LEAD = [
  PREVIEW_NAV_GROUPS_EMPLOYEE[0], PREVIEW_NAV_GROUPS_EMPLOYEE[1],
  ["Team", [
    ["Team Requests", "/approvals", Archive, 2],
  ]],
  PREVIEW_NAV_GROUPS_EMPLOYEE[2],
];
function adminNavActive(to, path) {
  return path === to
    || (to === "/employees" && (path.startsWith("/employees/") || path === "/teams" || path.startsWith("/teams/") || path === "/org-chart"))
    || (to === "/leaves" && (path === "/leave-balances" || path === "/all-requests"))
    || (to === "/my-profile" && (path === "/my-salary" || path === "/my-documents" || path === "/my-feedbacks"))
    || (to === "/my-leaves" && (path === "/leave-holidays" || path === "/requests" || path === "/approvals"))
    || (to === "/settings" && (path.startsWith("/settings/") || path === "/activity-logs" || path === "/feedback-form-builder"));
}
function previewNavActive(to, path) {
  return path === to
    || (to === "/my-profile" && (path === "/my-salary" || path === "/my-documents" || path === "/my-feedbacks"))
    || (to === "/my-leaves" && (path === "/leave-holidays" || path === "/requests"))
    || (to === "/approvals" && path === "/decision-history");
}

const EMPLOYEE_DIRECTORY_TABS = [
  ["Employees", "/employees", Users], ["Teams", "/teams", Network], ["Org Chart", "/org-chart", GitBranch],
];
const LEAVE_REQUESTS_TABS = [
  ["Leave Requests", "/leaves", CalendarDays], ["Leave Balances", "/leave-balances", WalletCards], ["Employee Services Requests", "/all-requests", ListChecks],
];
const MY_PROFILE_TABS = [
  ["Profile", "/my-profile", UserCog], ["Salary", "/my-salary", CircleDollarSign],
  ["Documents", "/my-documents", FileText], ["Feedback", "/my-feedbacks", MessageSquareText],
];
function myRequestsTabs(role) {
  const tabs = [["My Leaves", "/my-leaves", CalendarDays], ["Leave & Holidays", "/leave-holidays", Flag], ["Requests", "/requests", ClipboardCheck]];
  if (role === "Super Admin" || role === "Admin") tabs.push(["Approvals", "/approvals", Archive]);
  return tabs;
}
function SectionTabs({ tabs, path, go, line }) { const T=useT();
  if (line) return <div className="tabs-scroll"><div className="tabs line-tabs section-line-tabs">{tabs.map(([label, to]) => <button key={to} className={path === to ? "active" : ""} onClick={() => go(to)}>{T(label)}</button>)}</div></div>;
  return <div className="section-tabs">{tabs.map(([label, to, Icon]) => <button key={to} className={path === to ? "active" : ""} onClick={() => go(to)}><Icon size={15}/>{T(label)}</button>)}</div>;
}
function ScrollFadeTable({ className, children }) {
  const ref = useRef(null);
  const [fade, setFade] = useState(false);
  const check = () => { const el = ref.current; if (!el) return; setFade(el.scrollWidth - el.scrollLeft - el.clientWidth > 4); };
  useEffect(() => { check(); });
  useEffect(() => { window.addEventListener("resize", check); return () => window.removeEventListener("resize", check); }, []);
  return <div ref={ref} className={`${className}${fade ? " scroll-fade-right" : ""}`} onScroll={check}>{children}</div>;
}

function useRoute() {
  const [path, setPath] = useState(window.location.pathname === "/" ? "/dashboard" : window.location.pathname);
  useEffect(() => {
    const fn = () => setPath(window.location.pathname);
    window.addEventListener("popstate", fn); return () => window.removeEventListener("popstate", fn);
  }, []);
  const go = (to) => { window.history.pushState({}, "", to); setPath(to); window.scrollTo(0, 0); };
  return [path, go];
}

const avatarPalette = [["#E6F4EC","#016A2D"],["#E3EFF7","#0B4F75"],["#F1EAFB","#5B3E8C"],["#FBF0DC","#8A5C0C"],["#EEF0EF","#3A3D3C"],["#E1F3F0","#0B4F45"]];
function avatarStyle(seed = "") { let h = 0; for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0; const [background, color] = avatarPalette[h % avatarPalette.length]; return { background, color }; }
function Avatar({ initials = "M", small = false, photo }) { if (photo) return <span className={`avatar ${small ? "small" : ""}`}><img className="avatar-photo" src={photo} alt=""/></span>; return <span className={`avatar ${small ? "small" : ""}`} style={avatarStyle(initials)}>{initials}</span>; }
function Status({ children }) { const T=useT(); return <span className={`status ${String(children).toLowerCase().replaceAll(" ", "-")}`}>{typeof children==="string"?T(children):children}</span>; }
function IconButton({ icon: Icon, label, onClick, danger = false, success = false, className = "" }) { const T=useT(); return <button className={`icon-btn ${danger ? "danger" : ""} ${success ? "success" : ""} ${className}`} aria-label={T(label)} title={T(label)} onClick={onClick || (()=>announce(`${label} action opened`))}><Icon size={17}/></button>; }
const FILTER_DOT_GREEN=["Active","Approved","Created","Logged in","Completed"];
const FILTER_DOT_RED=["Blocked","Rejected","Deleted"];
function filterDotTone(opt) { return FILTER_DOT_GREEN.includes(opt) ? "green" : FILTER_DOT_RED.includes(opt) ? "red" : "gray"; }
// Single-trigger filter dropdown styled like the profile switcher (rows with a status dot,
// checkmark on the selected option) instead of a native select or a row of toggle pills.
function FilterMenu({ value, options, onChange, counts }) { const T=useT();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => { const onDoc = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }; document.addEventListener("mousedown", onDoc); return () => document.removeEventListener("mousedown", onDoc); }, []);
  return <div className="filter-menu" ref={ref}>
    <button type="button" className="filter-menu-trigger" onClick={()=>setOpen(v=>!v)} aria-expanded={open}><i className={`tone-dot ${filterDotTone(value)}`}/><span>{T(value)}</span>{counts?.[value]!=null && <b>{counts[value]}</b>}<ChevronDown size={13}/></button>
    {open && <div className="filter-menu-popover">{options.map(opt=><button type="button" key={opt} className={`profile-row ${opt===value?"selected":""}`} onClick={()=>{onChange(opt);setOpen(false)}}>
      <i className={`tone-dot ${filterDotTone(opt)}`}/>
      <span className="profile-row-copy"><strong>{T(opt)}</strong></span>
      {counts?.[opt]!=null && <small className="filter-menu-count">{counts[opt]}</small>}
      {opt===value && <Check size={16}/>}
    </button>)}</div>}
  </div>;
}
const LangCtx=React.createContext({lang:"ENG",setLang:()=>{}});
function koT(lang,en){if(lang!=="KOR"||typeof en!=="string")return en;if(KO[en]!==undefined)return KO[en];for(const[re,rp]of KO_PATTERNS){if(re.test(en))return en.replace(re,rp);}if(KO_MONTH_RE.test(en)){const out=en.replace(/(\d{1,2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec),? (\d{4})/g,(m,d,mo,y)=>y+"\ub144 "+KO_MONTHS[mo]+" "+d+"\uc77c").replace(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{1,2})(?:, (\d{4}))?/g,(m,mo,d,y)=>(y?y+"\ub144 ":"")+KO_MONTHS[mo]+" "+d+"\uc77c");if(out!==en)return out;}return en;}
function useT(){const{lang}=React.useContext(LangCtx);return(en)=>koT(lang,en);}
const KO={"Home":"홈","People":"인력","Requests":"신청","Assets & Documents":"자산 및 문서","Reports":"보고서","My Space":"내 공간","Settings":"설정","Overview":"개요","Dashboard":"대시보드","Employee Directory":"직원 목록","Announcements":"공지사항","Feedback Cycles":"피드백 사이클","Leave & Requests":"휴가 및 신청","Assets":"자산","Documents":"문서","My Profile":"내 프로필","My Team":"내 팀","My Leaves & Requests":"내 휴가 및 신청","My Dashboard":"내 대시보드","Create":"만들기","Request":"신청","Add Employee":"직원 추가","Create Team":"팀 만들기","Invite User":"사용자 초대","Post Announcement":"공지 작성","Run Report":"보고서 실행","Close":"닫기","Cancel":"취소","Save":"저장","Delete":"삭제","Edit":"수정","Download":"다운로드","Upload":"업로드","Approve":"승인","Reject":"거절","PEOPLE OPERATIONS":"인사 운영","Here's what needs attention across MUST today — 12 August 2026.":"오늘 MUST 전체에서 주의가 필요한 사항 — 2026년 8월 12일.","Open issues":"미해결 이슈","Pending approvals":"승인 대기","Members on PIP":"PIP 대상자","On leave today":"오늘 휴가 중","Active today":"오늘 활성","Total headcount":"총 인원","1 high priority":"높은 우선순위 1건","2 leave · 3 services":"휴가 2건 · 서비스 3건","Review needed":"검토 필요","All clear":"이상 없음","Across 6 teams":"6개 팀","99% of workforce":"인력의 99%","▲ 6 this quarter":"▲ 이번 분기 6명","Needs your action":"조치 필요","Approvals, reminders and system health":"승인, 알림 및 시스템 상태","Review all":"모두 검토","Leave requests":"휴가 신청","One request overlaps with a teammate":"팀원과 겹치는 신청 1건","Review":"검토","Employee Services requests":"직원 서비스 요청","Equipment and document requests":"장비 및 문서 요청","Reported issue":"신고된 문제","Employee profile export failed":"직원 프로필 내보내기 실패","Open":"열기","Feedback responses":"피드백 응답","Open across active cycles":"활성 사이클 내 미결","Remind":"알림 보내기","Missing manager":"매니저 없음","Employees with no reporting line set":"보고 라인 미설정 직원","Assign":"배정","Activity":"활동","Recent actions across the system":"시스템 내 최근 활동","View all":"모두 보기","Team availability":"팀 가용성","Today across MUST":"오늘 MUST 전체","Available":"가용","Out today":"오늘 결근","Starting soon":"곧 시작","Everyone is on track":"모든 직원이 정상입니다","No employees are currently on a PIP.":"현재 PIP 대상 직원이 없습니다.","By department":"부서별","Org chart":"조직도","Recently onboarded":"최근 입사","Newest employees across the company":"최근 합류한 직원","Upcoming events":"다가오는 이벤트","Birthdays and work anniversaries":"생일 및 근무 기념일","NEXT PUBLIC HOLIDAY":"다음 공휴일","Independence Day":"독립 기념일","Thu, 14 August · office closed":"목, 8월 14일 · 사무실 휴무","2 days to go":"2일 남음","Needs your attention":"주의 필요","Review now":"지금 검토","3 announcements and reminders need your attention.":"공지사항과 알림 3건이 주의를 요합니다.","2 approvals and 1 reminder need your attention.":"승인 2건 및 알림 1건이 주의를 요합니다.","2 approvals and 1 reported issue need review.":"승인 2건 및 신고 이슈 1건을 검토하세요.","Quick links":"빠른 링크","My Salary":"내 급여","My Documents":"내 문서","My Feedback":"내 피드백","Preview access":"접근 미리보기","Switch profile":"프로필 전환","Prototype preview — lets you demo other role views. Not shipped to real users.":"프로토타입 미리보기 — 다른 역할 화면을 체험할 수 있습니다. 실제 사용자에게는 제공되지 않습니다.","Sign out":"로그아웃","Report an issue":"이슈 신고","Good morning, ":"좋은 아침이에요, ","Birthday":"생일","1 year anniversary":"1주년","All Leaves":"전체 휴가","Awaiting decision":"결정 대기","Decision history":"결정 내역","Leave Management":"휴가 관리","Review and manage employee leave requests":"직원 휴가 신청을 검토하고 관리하세요","Leave Sheet":"휴가 시트","Apply for Employee":"직원 대리 신청","Completed":"완료","All Requests":"전체 신청","Search employee":"직원 검색","All leave types":"전체 휴가 유형","Filters":"필터","All teams":"전체 팀","All statuses":"전체 상태","Overlapping only":"중복만 보기","Clear filters":"필터 초기화","No leave requests":"휴가 신청 없음","Employee":"직원","Team":"팀","Leave type":"휴가 유형","Dates":"기간","Hours":"근무 시간","Flags":"플래그","Status":"상태","Leave Balances":"휴가 잔여","View and adjust employee leave balances":"직원 휴가 잔여를 확인하고 조정하세요","Export Balances":"잔여 내보내기","All Employee Services Requests":"전체 직원 서비스 신청","Track and manage employee requests":"직원 신청을 추적하고 관리하세요","Search requests":"신청 검색","All request types":"전체 신청 유형","Request type":"신청 유형","Details":"세부 내용","Submitted":"제출일","No Employee Services requests":"직원 서비스 신청 없음","No requests match the selected filters.":"선택한 필터에 맞는 신청이 없습니다.","Manage company assets and assignments":"회사 자산 및 배정을 관리하세요","Add Asset":"자산 추가","Search assets":"자산 검색","All asset types":"전체 자산 유형","Asset":"자산","Type":"유형","Asset ID":"자산 ID","Assigned to":"배정 대상","No assets found":"자산 없음","Try changing the filters or add a new asset.":"필터를 변경하거나 새 자산을 추가하세요.","Reassign":"재배정","Mark available":"가용으로 표시","Mark assigned":"배정됨으로 표시","Delete asset":"자산 삭제","Organization Chart":"조직도","Departments":"부서","Hierarchy":"계층구조","Jump to an employee…":"직원 검색…","Search team or code…":"팀 또는 코드 검색…","All departments":"전체 부서","Collapse":"접기","Expand all":"모두 펼치기","DEPARTMENT":"부서","Comprehensive HR analytics and insights":"종합 HR 분석 및 인사이트","Total Employees":"총 직원 수","Inactive":"비활성","Departures YTD":"올해 퇴사","No inactive records":"비활성 기록 없음","Resignations & terminations":"사직 및 해고","None recorded":"기록 없음","Workforce Growth":"인력 성장","Total headcount over the last 10 months":"최근 10개월 총 인원","Payroll Summary":"급여 요약","Payroll not connected":"급여 시스템 미연결","Connect a payroll provider to see gross pay, deductions and net pay by department.":"급여 제공업체를 연결하여 부서별 총급여, 공제액, 순급여를 확인하세요.","Headcount by Department":"부서별 인원","Employment Type":"고용 유형","Full-time":"정규직","100% of workforce":"인력의 100%","AVG HOURLY RATE BY DEPARTMENT":"부서별 평균 시급","Leave Report":"휴가 보고서","Days taken by leave type, year to date":"올해 휴가 유형별 사용일수","Open Positions":"공석","Active requisitions across the company":"회사 전체 활성 채용","Departures":"퇴사","Resignations, terminations and layoffs this year":"올해 사직·해고·구조조정","PIP Report":"PIP 보고서","Document Compliance":"문서 컴플라이언스","Not tracked yet":"아직 추적 안 됨","Connect e-signature status to see contract completion by employee here.":"전자서명 상태를 연결하여 직원별 계약 완료 현황을 확인하세요.","Saved Reports":"저장된 보고서","Headcount by department":"부서별 인원","Leave utilization":"휴가 활용","Payroll summary":"급여 요약","Tenure Analysis":"재직 기간 분석","Distribution of employees by time in company":"재직 기간별 직원 분포","Average Tenure":"평균 재직 기간","LONGEST TENURED":"최장 재직자","Broadcast updates to the whole company or specific teams.":"전체 또는 특정 팀에 공지를 발송하세요.","New Announcement":"새 공지","All announcements":"전체 공지","posted by":"작성자","Documents & Templates":"문서 및 템플릿","Company templates and org-wide document management.":"회사 템플릿 및 전체 문서 관리.","Template · edit →":"템플릿 · 수정 →","Company documents":"회사 문서","Back to Documents":"문서로 돌아가기","TEMPLATE":"템플릿","COMPANY DOCUMENT":"회사 문서","Edit Template":"템플릿 수정","Create and manage employee feedback cycles":"직원 피드백 사이클을 생성하고 관리하세요","Create Cycle":"사이클 생성","Active cycles":"활성 사이클","Open responses":"미결 응답","Completion rate":"완료율","Search cycles":"사이클 검색","Cycle":"사이클","Period":"기간","Audience":"대상","Edit cycle":"사이클 수정","Duplicate":"복제","Archive":"보관","Super-admin-only controls for the platform":"슈퍼 어드민 전용 플랫폼 제어","Super Admins":"슈퍼 어드민","Only a Super Admin can grant or revoke the Super Admin role.":"슈퍼 어드민만 슈퍼 어드민 역할을 부여하거나 취소할 수 있습니다.","CURRENT SUPER ADMINS (5)":"현재 슈퍼 어드민 (5)","PROMOTE A USER":"사용자 승격","Remove":"제거","Make Super Admin":"슈퍼 어드민으로 지정","Search users by name or email…":"이름 또는 이메일로 검색…","Crashes & Reported Issues":"크래시 및 신고된 이슈","Server & client crashes plus problems reported by users.":"서버 및 클라이언트 크래시와 사용자 신고 이슈.","Reported by":"신고자","Mark resolved":"해결됨으로 표시","Reopen":"재개","System Flags":"시스템 플래그","Platform-wide toggles — changes apply immediately for everyone.":"플랫폼 전체 토글 — 변경사항이 즉시 모든 사람에게 적용됩니다.","Maintenance mode":"유지보수 모드","Shows a maintenance banner and blocks sign-in for everyone except Super Admins.":"슈퍼 어드민을 제외한 모든 사용자의 로그인을 차단하고 유지보수 배너를 표시합니다.","Require 2FA for Admin & Super Admin":"어드민 2FA 필수","Admin-level accounts must set up two-factor authentication before they can sign in.":"어드민 계정은 로그인 전에 2단계 인증을 설정해야 합니다.","Allow self-registration":"자가 등록 허용","Let people with a @must.company email create their own account instead of being invited.":"@must.company 이메일 보유자가 초대 없이 직접 계정을 만들 수 있습니다.","Danger Zone":"위험 구역","Destructive actions that can't be undone — review carefully before confirming.":"취소할 수 없는 작업 — 확인 전에 신중히 검토하세요.","Clear notifications for one person":"한 명의 알림 초기화","Select a member…":"팀원 선택…","Clear for this person":"이 사람의 알림 초기화","Clear notifications for everyone":"전체 알림 초기화","Clear for everyone":"전체 알림 초기화","User & Role Management":"사용자 및 역할 관리","Manage user accounts, create custom roles, and control granular permissions":"사용자 계정 관리, 역할 생성 및 세부 권한 설정","Create User":"사용자 생성","Create Role":"역할 생성","Search by name, email, or role…":"이름, 이메일, 역할로 검색…","Set as Admin":"어드민으로 지정","Set as Employee":"직원으로 지정","Restore access":"접근 복원","Block access":"접근 차단","User":"사용자","Last Active":"마지막 활동","Actions":"작업","Block":"차단","Restore":"복원","Reset":"초기화","No blocked users":"차단된 사용자 없음","No users found":"사용자 없음","Blocked accounts will appear here.":"차단된 계정이 여기에 표시됩니다.","Try a different name, email, or role.":"다른 이름, 이메일, 또는 역할로 검색하세요.","Manage Permissions →":"권한 관리 →","Activity Logs":"활동 로그","Every action across the system — who did what, to whom, and when.":"시스템 전체 작업 기록 — 누가, 무엇을, 누구에게, 언제.","Search by person, action, or resource…":"사람, 작업, 리소스로 검색…","More filters":"추가 필터","Actor":"실행자","Record type":"레코드 유형","Data changes only":"데이터 변경만","When":"시각","Who":"누가","Action":"작업","On":"대상","No matching activity":"일치하는 활동 없음","Activity detail":"활동 상세","A complete record of this change":"이 변경의 전체 기록","Date and time":"날짜 및 시간","IP address":"IP 주소","Export Excel":"엑셀 내보내기","Search by name, email, or department…":"이름, 이메일, 또는 부서로 검색…","All Departments":"전체 부서","All Countries":"전체 국가","All Teams":"전체 팀","Grid":"그리드","Table":"테이블","On PIP":"PIP 대상","On IDA":"IDA 대상","Terminated":"해고","Resigned":"사직","Laid Off":"구조조정","Role":"역할","Dept":"부서","Joined":"입사일","Rate":"급여율","Back to employees":"직원 목록으로","Name":"이름","Relationship":"관계","IDA":"IDA","Salary":"급여","Working Hours":"근무 시간","Bank Details":"은행 정보","Edit History":"수정 이력","Terminate":"계약 종료","Department":"부서","Back to Teams":"팀 목록으로","No leader assigned":"리더 미지정","Team Members":"팀원","Add Member":"팀원 추가","REPORTS TO":"보고 대상","Leader":"리더","Team member":"팀원","Remove from team":"팀에서 제거","Search by team name, description, leader, or member…":"팀 이름, 설명, 리더, 팀원으로 검색…","No teams found":"팀 없음","No team matches this search.":"검색과 일치하는 팀이 없습니다.","Your leave requests.":"내 휴가 신청 목록입니다.","Fix & reapply":"수정 후 재신청","Reapply":"재신청","No Leave Requests":"휴가 신청 없음","Leave & Holidays":"휴가 및 공휴일","Your leave balances, public holidays and team on leave.":"휴가 잔여, 공휴일, 오늘 휴가 중인 팀원.","Apply for time off, overtime, and more — all in one place":"휴가, 초과근무 등 모든 신청을 한 곳에서","Summary":"요약","No Requests Yet":"신청 없음","Submit your first request using the button above.":"위의 버튼을 이용해 첫 신청을 제출하세요.","Requests awaiting your decision and your decision history":"결정 대기 중인 신청 및 결정 내역","Nothing waiting on you":"대기 중인 항목 없음","You're all caught up — new requests will appear here.":"모두 확인했습니다 — 새 신청이 여기에 표시됩니다.","No decisions yet":"결정 없음","Approved and rejected requests will appear here.":"승인 및 거절된 신청이 여기에 표시됩니다.","Record":"기록","Date":"날짜","Records added here will appear in this section.":"여기에 추가된 기록이 이 섹션에 표시됩니다.","Allowance":"부여량","Used":"사용량","Remaining":"잔여","Current entitlement and usage":"현재 부여량 및 사용량","Balances include approved requests for the 2026 leave year.":"잔여량에는 2026년 승인된 신청이 포함됩니다.","August 2026 attendance summary":"2026년 8월 출석 요약","Monthly":"월별","Daily":"일별","Days worked":"근무일수","Total hours":"총 시간","Average / day":"일평균","Late arrivals":"지각","Clock in":"출근","Clock out":"퇴근","Duration":"시간","Work email":"업무 이메일","Date of birth":"생년월일","Approval history":"승인 이력","Current stage":"현재 단계","Decided":"결정됨","Balance before":"신청 전 잔여","Balance after approval":"승인 후 잔여","Choose the leave type that matches your situation.":"상황에 맞는 휴가 유형을 선택하세요.","Search leave types…":"휴가 유형 검색…","Paid":"유급","Unpaid":"무급","Entitlement":"부여량","Balance":"잔여","Policy":"정책","Start date":"시작일","End date":"종료일","From (time)":"시작 시간","To (time)":"종료 시간","Current balance":"현재 잔여","Requested":"신청량","Balance after":"신청 후 잔여","Attachments / supporting documents (optional)":"첨부 파일 / 증빙 서류 (선택)","PDF, image, Word or Excel":"PDF, 이미지, Word 또는 Excel","Choose what you'd like to request.":"신청 유형을 선택하세요.","Back to leave types":"휴가 유형으로","Back to request types":"신청 유형으로","Performance Review":"성과 평가","Back to feedback forms":"피드백 양식으로","Build sections and questions for this feedback form":"피드백 양식의 섹션과 질문을 구성하세요","Preview":"미리보기","Save Form":"양식 저장","Sections":"섹션","Add Section":"섹션 추가","Section title":"섹션 제목","Long answer":"긴 답변","Short answer":"짧은 답변","Multiple choice":"객관식","Rating scale":"평가 척도","Add Question":"질문 추가","Request Types":"신청 유형","Define Employee Services request forms and their approval workflows":"직원 서비스 신청 양식 및 승인 흐름을 정의하세요","Add Request Type":"신청 유형 추가","No Request Types":"신청 유형 없음","Create your first request type (e.g. Overtime, Shift Adjustment).":"첫 신청 유형을 생성하세요 (예: 초과근무, 교대 조정).","Feedback Forms":"피드백 양식","Create and manage feedback form templates used in cycles":"사이클에 사용되는 피드백 양식 템플릿 관리","New form":"새 양식","Configure the types of leave employees can apply for — mirrors what employees see in Apply for Leave":"직원이 신청할 수 있는 휴가 유형 구성","Add Leave Type":"휴가 유형 추가","Add Department":"부서 추가","Add Company Entity":"회사 법인 추가","Company Entities":"회사 법인","Users & Roles":"사용자 및 역할","Your personal information":"개인 정보","Request a change":"변경 요청","Tech stack":"기술 스택","Emergency contact & address":"긴급 연락처 및 주소","Emergency contact":"긴급 연락처","Emergency phone":"긴급 연락처 전화","City":"도시","Country":"국가","Address":"주소","Team & reporting":"팀 및 보고","Department & team":"부서 및 팀","View your team":"내 팀 보기","No identity documents":"신분증 없음","Nothing has been recorded yet.":"아직 기록된 내용이 없습니다.","No education records":"학력 기록 없음","Nothing has been added yet.":"아직 추가된 내용이 없습니다.","Request change":"변경 요청","No assets issued to you":"배정된 자산 없음","No assignment history yet.":"배정 이력이 없습니다.","No leader":"리더 없음","Back":"뒤로","Confirm reject":"거절 확인","Leave Types":"휴가 유형","Platform Settings":"플랫폼 설정","Personal information":"개인 정보","ID & passport":"신분증 및 여권","Bank details":"은행 정보","Recipient information — must match the bank's records.":"수취인 정보 — 은행 기록과 일치해야 합니다.","Assigned assets":"배정된 자산","My Leaves":"내 휴가","Approvals":"승인","Active":"활성","All":"전체","Approved":"승인됨","Company entity":"회사 법인","Description":"설명","Designation":"직위","Education":"학력","Email":"이메일","IP":"IP","Joining date":"입사일","My Requests":"내 신청","New Request":"새 신청","No active PIPs":"활성 PIP 없음","No departures recorded":"퇴사 기록 없음","None":"없음","Pending":"대기 중","Phone":"전화","Reason":"사유","Rejected":"거절됨","Reports to":"보고 대상","Roles & Permissions":"역할 및 권한","Schedule":"일정","Search employees":"직원 검색","Super Admin only":"슈퍼 어드민 전용","Teams":"팀","Tenure":"재직 기간","Time zone":"시간대","Unit":"단위","Users":"사용자","View":"보기","member":"명","members":"명","Unable to load data":"데이터를 불러올 수 없음","Try again":"다시 시도","Cancel request":"신청 취소","Request cancellation":"취소 요청","Edit request":"신청 수정","Ask HRIS":"HRIS에 문의","Find people, facts and pages — instantly":"직원, 사실 및 페이지를 즉시 찾아보세요","Ask about a person, a fact or a page…":"직원, 사실 또는 페이지에 대해 질문하세요…","No employees found":"직원 없음","You don’t have access to this page":"이 페이지에 접근할 수 없습니다","Your current role does not include this permission. Switch role preview or return to your dashboard.":"현재 역할에 이 권한이 없습니다. 역할 미리보기를 전환하거나 대시보드로 돌아가세요.","Back to dashboard":"대시보드로","View payslip":"급여 명세서 보기","Hourly rate":"시급","per hour":"/ 시간","Latest payslip":"최신 급여 명세서","Here’s what’s happening at MUST today — 12 August 2026.":"MUST에서 오늘 일어나고 있는 일 — 2026년 8월 12일.","Requests awaiting your approval":"승인 대기 중인 신청","Your active request":"내 활성 신청","Download latest":"최신 다운로드","Latest net pay":"최신 순급여","effective Feb 2025":"2025년 2월 적용","June 2026":"2026년 6월","Team members":"팀원","Countries":"국가","Time zones":"시간대","Latest activity":"최근 활동","Your most recent requests":"최근 신청 목록","See all":"모두 보기","Public holidays":"공휴일","Team on leave":"휴가 중인 팀원","Coming up this week":"이번 주 예정","Upcoming Team holidays":"예정된 팀 공휴일","Nearing holidays by country · through next month":"다음 달까지 국가별 다가오는 공휴일","Announcements and reminders":"공지사항 및 알림","Mark all read":"모두 읽음 표시","Who’s out":"오늘 결근자","Your team, this week":"이번 주 우리 팀","Team calendar":"팀 캘린더","Annual Leave":"연차","days left":"일 남음","of 15 days":"/ 15일","All entities":"전체 법인","Attach a file":"파일 첨부","Approval flow: The system validates your eligibility automatically, then your request goes to your reporting manager for approval, and finally to HR for the final decision.":"승인 흐름: 시스템이 자격을 자동으로 검증한 후, 신청이 보고 매니저의 승인을 거쳐 HR의 최종 결정으로 이어집니다.","Employment contract":"고용 계약","Certificate":"인증서","Choose a file or drag it here":"파일을 선택하거나 여기에 드래그하세요","PDF, DOCX, JPG or PNG up to 10 MB":"PDF, DOCX, JPG 또는 PNG (최대 10MB)","All employees":"전체 직원","After probation":"수습 기간 후","Not allowed":"허용 안 됨","Allowed":"허용","Form fields":"양식 항목","Add Field":"항목 추가","Approval stages":"승인 단계","Add Stage":"단계 추가","Specific department":"특정 부서","Specific team":"특정 팀","Selected teams":"선택된 팀","Manager and self":"매니저 및 본인","360 feedback":"360도 피드백","Permissions":"권한","PERMISSIONS":"권한","USERS":"사용자","Select a reason":"사유 선택","Resignation":"사직","Termination":"해고","Redundancy":"구조조정","At end of last working day":"마지막 근무일 종료 시","Immediately":"즉시","Sign in":"로그인","Use your MUST account to continue.":"MUST 계정으로 계속하세요.","Continue with Google":"Google로 계속","Talk to your people team.":"인사팀에 문의하세요.","Prototype preview":"프로토타입 미리보기","Go to dashboard":"대시보드로 이동","Payslips and salary history":"급여 명세서 및 이력","Documents shared with you":"공유된 문서","Feedback cycles and responses":"피드백 사이클 및 응답","SOPs & Policies":"표준 운영 절차 및 정책","Company standard operating procedures and policies":"회사 표준 운영 절차 및 정책","No SOPs published yet":"아직 게시된 SOP 없음","Standard operating procedures and policy documents will appear here once published.":"표준 운영 절차 및 정책 문서가 게시되면 여기에 표시됩니다.","The people you work with, colour-coded by role.":"함께 일하는 동료들, 역할별로 색상 구분.","Pay period":"급여 기간","Gross":"총액","Deductions":"공제","Net":"순액","Document":"문서","Category":"카테고리","Shared":"공유","Reviewer":"검토자","Due date":"마감일","Progress":"진행률","Cycle name":"사이클 이름","Feedback form":"피드백 양식","Reviewers":"검토자","Allow negative ratings":"부정적 평가 허용","Lock responses after end date":"종료일 후 응답 잠금","Role name":"역할 이름","Form name":"양식 이름","Select user":"사용자 선택","Last working day":"마지막 근무일","Access end":"접근 종료","Leave type name":"휴가 유형명","Paid leave":"유급 휴가","Minimum duration":"최소 기간","Maximum duration":"최대 기간","Eligibility":"자격","Carry over":"이월","Request type name":"신청 유형명","Title":"제목","Pin to top":"상단 고정","Message":"메시지","Manager":"매니저","Yes":"예","No":"아니오","Days":"일","They won't be able to sign in until you restore access. Their employee record and history are kept.":"접근을 복원하기 전까지 로그인할 수 없습니다. 직원 기록 및 이력은 유지됩니다.","teammate":"팀원","teammates":"팀원들","Probation Review":"수습 평가","Report a balance issue":"잔여 오류 신고","Recent payments":"최근 급여","Upcoming":"예정","Payment account information":"결제 계좌 정보","Edit details":"정보 수정","47% available":"47% 가용","Loading error":"로딩 오류","Empty":"비어 있음","Clear":"초기화","Data":"데이터","Please describe the reason for your leave request…":"휴가 신청 사유를 입력하세요…","Search request types…":"신청 유형 검색…","Explain why this is being rejected — the employee will see this reason.":"거절 사유를 설명하세요 — 직원이 이 사유를 확인합니다.","Explain this adjustment":"조정 사유를 설명하세요","Write the announcement…":"공지를 작성하세요…","e.g. Public holiday on Monday":"예: 월요일 공휴일","e.g. Human Resource":"예: 인사부문","e.g. HR":"예: HR","e.g. MUST Engage":"예: MUST Engage","Type CLEAR to confirm":"CLEAR 입력하여 확인","Search 44 permissions":"44개 권한 검색","Leaves":"휴가","HR Notes":"HR 노트","ID & Passport":"신분증 및 여권","Performance Improvement Plans":"성과 개선 계획","Internal Disciplinary Actions":"내부 징계 조치","Salary Records":"급여 기록","Assigned Assets":"배정된 자산","Contracts, certificates and other employee files":"계약서, 인증서 및 기타 직원 파일","Qualifications and education history":"자격증 및 학력 이력","Identity documents and expiry details":"신분 서류 및 만료 세부정보","Private employee notes and records":"직원 개인 노트 및 기록","Track performance improvement activity":"성과 개선 활동 추적","Track disciplinary actions":"징계 조치 추적","Compensation and deduction history":"보상 및 공제 이력","Company property assigned to this employee":"이 직원에게 배정된 회사 자산","Changes made to this employee record":"이 직원 기록에 대한 변경 사항","Upload Document":"문서 업로드","Add Qualification":"학력 추가","Add Document":"문서 추가","Add HR Note":"HR 노트 추가","Start PIP":"PIP 시작","Start IDA":"IDA 시작","Add Salary Record":"급여 기록 추가","Assign Asset":"자산 배정","No documents uploaded":"업로드된 문서 없음","No PIP records":"PIP 기록 없음","No disciplinary actions":"징계 조치 없음","No Salary Records":"급여 기록 없음","No Assigned Assets":"배정된 자산 없음","No records found":"기록 없음","There is nothing to display yet.":"아직 표시할 내용이 없습니다.","No records":"기록 없음","This gives unrestricted access to all employee data, settings and platform controls.":"모든 직원 데이터, 설정 및 플랫폼 제어에 대한 무제한 접근 권한을 부여합니다.","This action may affect employee records and cannot always be undone. Review the target carefully before continuing.":"이 작업은 직원 기록에 영향을 줄 수 있으며 취소할 수 없습니다. 계속하기 전에 대상을 신중히 검토하세요.","Removes every Slack DM this app has sent to the selected person — they’ll stop seeing old reminders, but new ones will still be delivered normally. Cannot be undone.":"이 앱이 해당 사람에게 보낸 모든 슬랙 DM을 삭제합니다 — 이전 알림은 사라지지만 새 알림은 계속 전달됩니다. 취소할 수 없습니다.","CHALLENGE":"도전","TOGETHER":"함께","ACHIEVE":"달성","Blocked":"차단됨","Unlimited":"무제한","System":"시스템","Only ":""," accounts.":" 계정만 사용할 수 있습니다.","Trouble signing in?":"로그인에 문제가 있나요?","Action completed and recorded in Activity Logs":"작업 완료 · 활동 로그에 기록됨","Add a reason before rejecting":"거절하기 전에 사유를 입력하세요","All reminders marked as read":"모든 알림이 읽음 처리됨","Approved and added to decision history":"승인되어 결정 내역에 추가됨","Bank detail change request opened":"은행 정보 변경 요청 열림","Complete the required fields before saving":"저장하기 전에 필수 항목을 입력하세요","Enter a company entity":"회사 법인을 입력하세요","Enter a department code":"부서 코드를 입력하세요","Feedback form duplicated":"피드백 양식 복제됨","Headcount CSV export prepared":"인원 CSV 내보내기 준비됨","Issue report opened — describe the problem and attach evidence":"이슈 신고 열림 — 문제를 설명하고 증빙을 첨부하세요","Leave CSV export prepared":"휴가 CSV 내보내기 준비됨","Leave request submitted for approval":"휴가 신청이 승인을 위해 제출되었습니다","Message sent to your people team":"인사팀에 메시지가 전송되었습니다","Profile change request opened":"프로필 변경 요청 열림","Reapplying with previous details prefilled":"이전 정보를 미리 채워 재신청합니다","Request submitted for approval":"신청이 승인을 위해 제출되었습니다","Showing all public holidays":"전체 공휴일을 표시합니다","Slack notifications cleared for everyone":"전체 슬랙 알림이 초기화되었습니다","This record already exists":"이미 존재하는 기록입니다","Remove Super Admin access?":"슈퍼 어드민 권한을 제거하시겠습니까?","The user keeps their employee account but loses all administration permissions.":"사용자는 직원 계정을 유지하지만 모든 관리 권한을 잃습니다.","Their HR history remains available.":"HR 이력은 계속 유지됩니다.","This removes the employee profile and cannot be undone.":"직원 프로필이 삭제되며 취소할 수 없습니다.","Delete Matilda Ipeh Anashie permanently?":"Matilda Ipeh Anashie 님을 영구 삭제하시겠습니까?","End Matilda Ipeh Anashie’s employment?":"Matilda Ipeh Anashie 님의 고용을 종료하시겠습니까?","Delete “UX/UI Team”? Members will be unassigned but not deleted.":"“UX/UI Team” 팀을 삭제하시겠습니까? 팀원은 배정 해제되지만 삭제되지는 않습니다.","Removes every Slack DM this app has ever sent, for":"이 앱이 지금까지 보낸 모든 슬랙 DM을 삭제합니다 — 대상:","all 288 employees":"전체 직원 288명"," at once. This cannot be undone and cannot be limited to one person after the fact — type":" 일괄 삭제됩니다. 취소할 수 없으며 사후에 특정인으로 제한할 수 없습니다 — 범위를 이해했음을 확인하려면 아래에"," below to confirm you understand the scope.":" 를 입력하세요.","Add":"추가","Admin":"어드민","Assigned":"배정됨","Cancelled":"취소됨","Expired":"만료됨","Laptop":"노트북","Mobile Phone":"휴대폰","Other":"기타","Super Admin":"슈퍼 어드민","Employee record":"직원 기록","Required":"필수","Run":"실행","Leave":"휴가","Time off & all leave types · Approval: Manager → HR":"휴가 · 모든 휴가 유형 · 승인: 매니저 → HR","Approval flow:":"승인 흐름:","Manager → HR":"매니저 → HR","Mon–Fri":"월–금","Message on Slack":"슬랙으로 메시지 보내기","Reserved · pending":"예약됨 · 대기 중","Monthly 360° reflection covering collaboration, communication, growth, problem-solving, and ownership.":"협업, 소통, 성장, 문제 해결, 주인의식을 다루는 월간 360° 회고.","Next Level Growth – Monthly 360° Reflection":"Next Level Growth – 월간 360° 회고","June 2026 · 392 hrs":"2026년 6월 · 392시간","Annual Leave · 12–14 Aug":"연차 · 8월 12–14일","Good morning,":"좋은 아침이에요,","For a partial day, set the exact hours you'll be off (e.g. 09:00–13:00 = half day).":"부분 휴가는 정확한 시간을 설정하세요 (예: 09:00–13:00 = 반차).","For a partial day, set the exact hours you’ll be off (e.g. 09:00–13:00 = half day).":"부분 휴가는 정확한 시간을 설정하세요 (예: 09:00–13:00 = 반차).","First name":"이름","Last name":"성","Phone number":"전화번호","Job title":"직함","Employment type":"고용 유형","Team name":"팀 이름","Team code":"팀 코드","Team lead":"팀 리더","Asset name":"자산 이름","Asset type":"자산 유형","Serial number":"일련번호","Purchase date":"구매일","Purchase price":"구매 가격","Current value":"현재 가치","Assigned employee":"배정 직원","Location":"위치","Notes":"노트","Email address":"이메일 주소","Linked employee":"연결된 직원","Temporary password":"임시 비밀번호","Department name":"부서명","Entity name":"법인명","Registration number":"등록 번호","Tax number":"세금 번호","Note type":"노트 유형","Qualification":"자격","Institution":"기관","Grade":"성적","Document number":"문서 번호","Country of issue":"발급 국가","Issue date":"발급일","Expiry date":"만료일","Document file":"문서 파일","Effective date":"적용일","Gross salary":"총급여","Currency":"통화","Tax deduction":"세금 공제","Pension deduction":"연금 공제","Other deductions":"기타 공제","Account name":"계좌 이름","Bank name":"은행명","Account number":"계좌 번호","Branch name":"지점명","SWIFT / BIC":"SWIFT / BIC","IBAN":"IBAN","Role in team":"팀 내 역할","Adjustment":"조정","Department Code":"부서 코드","Department Title":"부서명","Document name":"문서 이름","Document type":"문서 유형","Feedback Form":"피드백 양식","File":"파일","New Company Entity":"새 회사 법인","New balance":"새 잔여량","Auto-calculated from the date & time window.":"날짜 및 시간 범위에서 자동 계산됩니다.","Something went wrong while loading this data.":"데이터를 불러오는 중 문제가 발생했습니다.","Asset records could not be read because a required value is unavailable.":"필수 값이 없어 자산 기록을 읽을 수 없습니다.","Requests could not be loaded because the service response is incomplete.":"서비스 응답이 불완전하여 신청을 불러올 수 없습니다.","The leave request service returned an unexpected database response.":"휴가 신청 서비스가 예상치 못한 데이터베이스 응답을 반환했습니다.","Not Found":"찾을 수 없음","Page not found":"페이지를 찾을 수 없음","This Admin page does not exist.":"이 어드민 페이지는 존재하지 않습니다.","Document not found":"문서를 찾을 수 없음","This document or template doesn't exist.":"이 문서 또는 템플릿은 존재하지 않습니다.","No audit entries match these filters. Try clearing one and searching again.":"필터에 맞는 감사 기록이 없습니다. 필터를 해제하고 다시 검색하세요.","More":"더 보기","Send":"보내기","View details":"상세 보기","View request":"신청 보기","Delete question":"질문 삭제","Download payslip":"급여 명세서 다운로드","Download document":"문서 다운로드","Reset zoom":"확대/축소 초기화","Zoom in":"확대","Zoom out":"축소","Language":"언어","Notifications":"알림","Close menu":"메뉴 닫기","Open menu":"메뉴 열기","Close Ask HRIS":"HRIS 문의 닫기","Dismiss notification":"알림 닫기","Search employees globally":"전체 직원 검색","Select all":"모두 선택","Select all users":"모든 사용자 선택","Select row":"행 선택","Add / edit employee":"직원 추가 / 수정","Create / edit team":"팀 생성 / 수정","Add / edit asset":"자산 추가 / 수정","Create / edit user":"사용자 생성 / 수정","Apply leave for employee":"직원 대리 휴가 신청","Add / edit department":"부서 추가 / 수정","Add / edit company entity":"회사 법인 추가 / 수정","Upload document":"문서 업로드","Add qualification":"학력 추가","Add identity document":"신분 서류 추가","Add HR note":"HR 노트 추가","Start performance improvement plan":"성과 개선 계획 시작","Start disciplinary action":"징계 조치 시작","Add salary record":"급여 기록 추가","Edit bank details":"은행 정보 수정","Edit leave balance":"휴가 잔여 수정","Leave request details":"휴가 신청 상세","Employee Services request details":"직원 서비스 신청 상세","Apply for Leave":"휴가 신청","Add / edit leave type":"휴가 유형 추가 / 수정","Add / edit request type":"신청 유형 추가 / 수정","Create feedback cycle":"피드백 사이클 생성","Manage role permissions":"역할 권한 관리","Create feedback form":"피드백 양식 생성","Add Super Admin":"슈퍼 어드민 추가","Add team member":"팀원 추가","Terminate employee":"직원 계약 종료","Delete record":"기록 삭제","Delete Team":"팀 삭제","Remove Super Admin":"슈퍼 어드민 제거","Confirm action":"작업 확인","This Admin action bypasses standard employee leave validation.":"이 어드민 작업은 표준 직원 휴가 검증을 우회합니다.","Search employees, documents…":"직원, 문서 검색…","Search employees…":"직원 검색…","Enter account name":"계좌 이름 입력","Enter account number":"계좌 번호 입력","Enter address":"주소 입력","Enter asset name":"자산 이름 입력","Enter asset type":"자산 유형 입력","Enter assigned employee":"배정 직원 입력","Enter bank name":"은행명 입력","Enter branch name":"지점명 입력","Enter certificate":"인증서 입력","Enter country":"국가 입력","Enter country of issue":"발급 국가 입력","Enter currency":"통화 입력","Enter current value":"현재 가치 입력","Enter date":"날짜 입력","Enter department":"부서 입력","Enter department name":"부서명 입력","Enter description":"설명 입력","Enter document file":"문서 파일 입력","Enter document number":"문서 번호 입력","Enter document type":"문서 유형 입력","Enter duration":"시간 입력","Enter effective date":"적용일 입력","Enter email address":"이메일 주소 입력","Enter employee":"직원 입력","Enter employment type":"고용 유형 입력","Enter end date":"종료일 입력","Enter entity name":"법인명 입력","Enter expiry date":"만료일 입력","Enter first name":"이름 입력","Enter grade":"성적 입력","Enter gross salary":"총급여 입력","Enter iban":"IBAN 입력","Enter institution":"기관 입력","Enter issue date":"발급일 입력","Enter job title":"직함 입력","Enter last name":"성 입력","Enter leave type":"휴가 유형 입력","Enter linked employee":"연결된 직원 입력","Enter location":"위치 입력","Enter note type":"노트 유형 입력","Enter notes":"노트 입력","Enter other deductions":"기타 공제 입력","Enter pension deduction":"연금 공제 입력","Enter phone number":"전화번호 입력","Enter purchase date":"구매일 입력","Enter purchase price":"구매 가격 입력","Enter qualification":"자격 입력","Enter reason":"사유 입력","Enter registration number":"등록 번호 입력","Enter role":"역할 입력","Enter role in team":"팀 내 역할 입력","Enter swift / bic":"SWIFT / BIC 입력","Enter serial number":"일련번호 입력","Enter start date":"시작일 입력","Enter status":"상태 입력","Enter tax deduction":"세금 공제 입력","Enter tax number":"세금 번호 입력","Enter team":"팀 입력","Enter team code":"팀 코드 입력","Enter team lead":"팀 리더 입력","Enter team name":"팀 이름 입력","Enter temporary password":"임시 비밀번호 입력","Enter work email":"업무 이메일 입력","Broadcast updates to the whole company or specific teams":"전체 또는 특정 팀에 공지를 발송하세요","Build reusable feedback questionnaires":"재사용 가능한 피드백 설문을 구성하세요","Company templates and org-wide document management":"회사 템플릿 및 전체 문서 관리","Configure Employee Services request workflows":"직원 서비스 신청 워크플로를 구성하세요","Configure leave policies and allowances":"휴가 정책 및 부여량을 구성하세요","Decision History":"결정 내역","Employee Services Requests":"직원 서비스 신청","Employees":"직원","Feedback":"피드백","Here's what's happening with your team":"우리 팀의 현황입니다","Here’s what’s happening with your team":"우리 팀의 현황입니다","Leave Requests":"휴가 신청","Manage company departments":"회사 부서를 관리하세요","Manage employee records and employment details":"직원 기록 및 고용 정보를 관리하세요","Manage legal entities and locations":"법인 및 지역을 관리하세요","Manage super admins and platform health":"슈퍼 어드민 및 플랫폼 상태를 관리하세요","Manage teams and reporting structures":"팀 및 보고 체계를 관리하세요","Manage user access, roles and permissions":"사용자 접근, 역할 및 권한을 관리하세요","Org Chart":"조직도","Organization structure, policies, and access & security":"조직 구조, 정책, 접근 및 보안","Profile":"프로필","Requests awaiting your decision":"결정 대기 중인 신청","Review user and system activity":"사용자 및 시스템 활동을 검토하세요","Team Requests":"팀 신청","View HR analytics and workforce insights":"HR 분석 및 인력 인사이트를 확인하세요","View and manage your reporting structure":"보고 체계를 확인하고 관리하세요","Welcome back":"다시 오신 것을 환영합니다","Your Employee Services requests":"내 직원 서비스 신청","Your HR workspace":"내 HR 워크스페이스","Your employee documents":"내 직원 문서","Your employee profile":"내 직원 프로필","Your feedback activity":"내 피드백 활동","Your leave balances, public holidays and team on leave":"휴가 잔여, 공휴일, 휴가 중인 팀원","Your leave requests":"내 휴가 신청","Your past approval decisions":"과거 승인 결정 내역","Your salary records":"내 급여 기록","Your team and reporting line":"내 팀 및 보고 라인","Asset / Equipment Request":"자산 / 장비 신청","Compassionate Leave":"경조사 휴가","Finance Document Request":"재무 문서 신청","General Operational Request":"일반 운영 신청","HR Document Request":"HR 문서 신청","Overtime (OT)":"초과근무 (OT)","Public Holiday":"공휴일","Shift Management Request":"교대 관리 신청","Sick Leave":"병가","Vacation Leave (VL)":"휴가 (VL)","Work From Home Request":"재택근무 신청"," file":" 파일"," files":" 파일","Team leads":"팀 리더","New employees":"신입 직원","Ongoing":"진행 중","Q3 all-hands on 20 Aug":"8월 20일 Q3 전사 회의","New leave policy — Bonus Vacation":"새 휴가 정책 — 보너스 휴가","Office closed — Independence Day":"사무실 휴무 — 독립 기념일","Welcome new joiners to the team":"새로 합류한 팀원을 환영합니다","All staff":"전체 직원","BIC office":"BIC 사무실","Sent":"발송됨","Employment Contract":"고용 계약서","Offer & full-time contract":"오퍼 및 정규직 계약","Offer Letter":"오퍼 레터","Candidate offers":"후보자 오퍼","NDA":"비밀유지계약서(NDA)","Confidentiality agreement":"기밀 유지 계약","Experience Letter":"경력 증명서","On request / exit":"요청 시 / 퇴사 시","Salary Certificate":"급여 증명서","Bank & visa letters":"은행 및 비자 서류","Warning Letter":"경고장","HR disciplinary":"HR 징계","Employee Handbook 2026":"직원 핸드북 2026","PDF · 4.2 MB · all staff":"PDF · 4.2 MB · 전체 직원","Code of Conduct":"행동 강령","Requires annual acknowledgement":"연 1회 확인 필요","Data Privacy Policy":"데이터 개인정보 보호 정책","PDF · all staff":"PDF · 전체 직원","Published":"게시됨","Headcount":"인원","Pip":"PIP","Annual Leaves":"연차","Bonus Vacation Leave (BVL)":"보너스 휴가 (BVL)","Family Leave":"가족 돌봄 휴가","Maternity Leave":"출산 휴가","hrs left":"시간 남음","of":"총","hrs":"시간","Regular":"정규직","The top of the org hierarchy — Department → Team → Team Code.":"조직 계층의 최상위 — 부서 → 팀 → 팀 코드.","The legal/brand entities employees belong to (e.g. MUST Company PK, MUST U, MUST Engage).":"직원이 소속된 법인/브랜드 (예: MUST Company PK, MUST U, MUST Engage).","Office closed":"사무실 휴무","Public holiday":"공휴일","Thu, 14 Aug":"목, 8월 14일","Fri, 4 Sep":"금, 9월 4일","Mon, 9 Nov":"월, 11월 9일","Eid Milad un-Nabi":"이드 밀라드 운 나비","Iqbal Day":"이크발 데이","Lahore, PK · 2026":"라호르, 파키스탄 · 2026","Annual · back Mon":"연차 · 월요일 복귀","Sick · today":"병가 · 오늘","WFH · today":"재택 · 오늘","Product Designer":"프로덕트 디자이너","Visual Designer":"비주얼 디자이너","Video Editor":"영상 편집자","Singapore":"싱가포르","Pakistan":"파키스탄","South Korea":"대한민국","Philippines":"필리핀","United Kingdom":"영국","National Day":"국경일","Liberation Day":"광복절","Ninoy Aquino Day":"니노이 아키노 데이","Summer Bank Holiday":"서머 뱅크 홀리데이","Mon, Aug 10, 2026":"2026년 8월 10일 (월)","Fri, Aug 14, 2026":"2026년 8월 14일 (금)","Sat, Aug 15, 2026":"2026년 8월 15일 (토)","Fri, Aug 21, 2026":"2026년 8월 21일 (금)","Mon, Aug 31, 2026":"2026년 8월 31일 (월)"," teammates":"명의 팀원"," teammate":"명의 팀원","Tenure leave":"근속 휴가","Paid Time Off (PTO)":"유급 근무외 시간 (PTO)","Unpaid Time Off (UTO)":"무급 휴가 (UTO)","4h units":"4시간 단위","any duration":"제한 없음","Team Lead":"팀 리드","Never signed in":"로그인 기록 없음","Active yesterday":"어제 활동","Nov":"11월","Dec":"12월","Jan":"1월","Feb":"2월","Mar":"3월","Apr":"4월","May":"5월","Jun":"6월","Jul":"7월","Aug":"8월","< 6 mo":"6개월 미만","6–12 mo":"6–12개월","1–2 yr":"1–2년","2–5 yr":"2–5년","5+ yr":"5년 이상","Employees are entitled to annual paid leave based on their employment category, MF/MS. These leave entitlements become available only after the successful completion of the employee's probation period. For employees who join the organization mid-year, leave entitlement is calculated on a pro rata basis, depending on the number of remaining months in the calendar year following completion of probation. MS – 15 days · MF – 12 days.":"직원은 고용 구분(MF/MS)에 따라 연간 유급 휴가를 부여받습니다. 이 휴가는 수습 기간을 성공적으로 마친 후에만 사용할 수 있습니다. 연중 입사자의 경우 수습 완료 후 남은 개월 수에 따라 비례 계산됩니다. MS – 15일 · MF – 12일.","Regular full-time employees who have completed probation may earn Bonus Vacation Leave (BVL) as a reward for consistent attendance and compliance with company policies. Employees who achieve 100% attendance, with no unpaid/short leave and no policy violations, may receive 4 days of BVL. These leaves cannot be combined with any other leave.":"수습을 마친 정규직 직원은 성실한 출근과 회사 정책 준수에 대한 보상으로 보너스 휴가(BVL)를 받을 수 있습니다. 무급/단축 휴가와 정책 위반 없이 100% 출근한 직원은 4일의 BVL을 받을 수 있습니다. 이 휴가는 다른 휴가와 합산할 수 없습니다.","Eligible regular employees may take up to 5 consecutive days of paid Family Leave for their own marriage, serious illness of an immediate family member, or bereavement. Planned events require advance notice and supporting documents. Leave must be taken in full-day increments and is subject to approval and operational requirements.":"자격을 갖춘 정규직 직원은 본인 결혼, 직계 가족의 중병 또는 사망 시 최대 5일 연속 유급 가족 돌봄 휴가를 사용할 수 있습니다. 계획된 일정은 사전 통보와 증빙 서류가 필요합니다. 휴가는 종일 단위로 사용해야 하며 승인 및 운영 요건의 적용을 받습니다.","Full-time regular female employees with at least one year of service are entitled to 1.5 months (45 calendar days) of paid maternity leave upon providing a medical certificate. The leave can commence up to five days before the expected delivery date. If medically justified, an employee may request additional unpaid leave, subject to management and HR approval; the paid leave is non-convertible to cash.":"1년 이상 근속한 정규직 여성 직원은 진단서 제출 시 1.5개월(45일)의 유급 출산 휴가를 받을 수 있습니다. 휴가는 출산 예정일 5일 전부터 시작할 수 있습니다. 의학적으로 필요한 경우 경영진 및 HR 승인 하에 추가 무급 휴가를 신청할 수 있으며, 유급 휴가는 현금으로 전환할 수 없습니다.","The purpose of overtime is to meet urgent demands, additional workloads and critical deadlines, or to handle emergencies and peak operational hours. This policy outlines the terms under which employees may be required or allowed to work beyond regular hours, ensuring fair compensation and regulatory compliance. The maximum duration for regular overtime is 3 hours, and it must always be requested and approved before the work is performed — it cannot be applied for after the fact.":"초과근무는 긴급 수요, 추가 업무량, 중요한 마감일 또는 비상 상황과 피크 시간 대응을 위한 것입니다. 이 정책은 직원이 정규 시간 외 근무를 하는 조건을 규정하여 공정한 보상과 규정 준수를 보장합니다. 정규 초과근무의 최대 시간은 3시간이며, 반드시 근무 수행 전에 신청 및 승인되어야 합니다 — 사후 신청은 불가능합니다.","PTO is designated for work-related scenarios where time cannot be logged through the timer application — official travel or work conducted outside the office for company business (client meetings, site visits), and attendance at company-organized events, seminars or training sessions. PTO must be applied for in advance or on the day it is being taken; late submissions are not permitted. Eligibility: all full-time employees.":"PTO는 타이머 앱으로 시간을 기록할 수 없는 업무 상황 — 회사 업무를 위한 출장 또는 외부 근무(고객 미팅, 현장 방문), 회사 주최 행사·세미나·교육 참석 — 을 위한 것입니다. PTO는 사전 또는 당일에 신청해야 하며, 사후 제출은 허용되지 않습니다. 대상: 모든 정규직 직원.","Backend Developer":"백엔드 개발자","Backend Engineer":"백엔드 엔지니어","CS Team Leader":"CS 팀 리더","Chief Executive Officer":"최고경영자(CEO)","Director of Sales":"세일즈 디렉터","Frontend Developer (Web Publisher)":"프론트엔드 개발자 (웹 퍼블리셔)","HR Management Specialist":"HR 관리 스페셜리스트","HRIS Employee Console":"HRIS 직원 콘솔","HRIS Super Admin Console":"HRIS 슈퍼 어드민 콘솔","HRIS Team Lead Console":"HRIS 팀 리드 콘솔","Head of Product":"프로덕트 총괄","Mobile Developer":"모바일 개발자","People Operations Manager":"피플 오퍼레이션 매니저","Product Design Team Lead":"프로덕트 디자인 팀 리드","Recruitment Content-Team Leader":"리크루팅 콘텐츠팀 리더","Recruitment Operations - Team Lead":"리크루팅 운영 팀 리드","Recruitment Team Lead":"리크루팅 팀 리드","Senior Product Designer":"시니어 프로덕트 디자이너","Technical Recruiter":"테크니컬 리크루터","Flutter & Android Developer":"Flutter & Android 개발자","Duplicate Slack reminder sent":"중복 슬랙 알림 전송됨","Leave balance rounding mismatch":"휴가 잔여 반올림 불일치","salary record":"급여 기록","Q2 Leadership feedback cycle":"Q2 리더십 피드백 사이클","H1 2026 Performance Review":"H1 2026 성과 평가","Q3 Leadership Feedback":"Q3 리더십 피드백","Monitor":"모니터","Overlap":"중복","Blockchain Dp.":"블록체인 부문","Created":"생성됨","Updated":"수정됨","Deleted":"삭제됨","Logged in":"로그인함","Viewed":"조회함","AI Team":"AI팀","AI Transformation Team":"AI 트랜스포메이션팀","AI Video Studio":"AI 비디오 스튜디오","AX Booster Team":"AX 부스터팀","AX Support Office":"AX 지원 오피스","Account Executive (Services) Team":"어카운트 이그제큐티브 (서비스)팀","Agency Dep.":"에이전시 부문","App Team":"앱팀","Backend Team":"백엔드팀","Beauty Team":"뷰티팀","Blockchain Team":"블록체인팀","CX Team":"CX팀","Commerce Dep.":"커머스 부문","Company Brand Strategy Team":"컴퍼니 브랜드 전략팀","Company Culture Institute":"컴퍼니 컬처 연구소","Company PR Team":"컴퍼니 PR팀","Company Strategy Planning Team":"컴퍼니 전략 기획팀","Content Creation Team":"콘텐츠 제작팀","Contents Studio":"콘텐츠 스튜디오","Contents Team":"콘텐츠팀","Creative Design Team":"크리에이티브 디자인팀","Crew Video Studio":"크루 비디오 스튜디오","Customer Service Team":"고객 서비스팀","Design Dep.":"디자인 부문","DevOps Team":"DevOps팀","E-Commerce Team":"이커머스팀","Entertainment Video Studio":"엔터테인먼트 비디오 스튜디오","Exchange Service Development Team":"거래소 서비스 개발팀","Exchange Service Group":"거래소 서비스 그룹","Finance Strategy Dep.":"재무 전략 부문","Finance Team":"재무팀","Food & Beverage Dep":"식음료 부문","Global Development Team 1":"글로벌 개발팀 1","Global Development Team 2":"글로벌 개발팀 2","HR Management Team":"HR 관리팀","HR Strategy Planning Team":"HR 전략 기획팀","Human Resources Div.":"인사 본부","Korea Region Team":"한국 지역팀","Local Business Team":"로컬 비즈니스팀","MOAD Development Team":"MOAD 개발팀","MOAD Labs":"MOAD 랩스","MOAD Operation Team":"MOAD 운영팀","MOAD Sales Team":"MOAD 세일즈팀","MOAD Team":"MOAD팀","Management Team":"관리팀","Marketing Dep.":"마케팅 부문","Marketing Team":"마케팅팀","Marketing team":"마케팅팀","Markup & QA Engineering Team":"마크업 & QA 엔지니어링팀","Media Contents Dep.":"미디어 콘텐츠 부문","Mongolia Region Team":"몽골 지역팀","Operation & Admin Team":"운영 & 관리팀","Operation Team":"운영팀","Platform Contents Dep.":"플랫폼 콘텐츠 부문","Pre-Sales & Consulting Team":"프리세일즈 & 컨설팅팀","President":"사장","Purchasing Procurement Team":"구매 조달팀","QA Team":"QA팀","R&D Office":"R&D 오피스","Recruitment Operations Team":"리크루팅 Operations팀","Recruitment Team":"리크루팅팀","SEA Region Retail Dep.":"SEA 지역 리테일 부문","Sales Dep.":"세일즈 부문","Sales Development Team":"세일즈 개발팀","Solutions Architecture Team":"솔루션 아키텍처팀","Space Business Team":"스페이스 비즈니스팀","Strategy Planning Dep.":"전략 기획 부문","Strategy Planning Team":"전략 기획팀","Super Trust Group":"슈퍼 트러스트 그룹","Talent Onboarding Team":"탤런트 온보딩팀","Tech Audit & Security Lab":"테크 감사 & 보안 랩","Technical Team":"Technical팀","UX Planning Team":"UX 기획팀","UX/UI Team":"UX/UI 팀","Value Strategy Dep.":"밸류 전략 부문","Vice President":"부사장","Anyone":"전체","All records":"전체 레코드","All Roles":"전체 역할"," selected":"개 선택됨","India":"인도","Nigeria":"나이지리아","Sri Lanka":"스리랑카","Ghana":"가나","Türkiye":"튀르키예","Leave request":"휴가 신청","Work schedule":"근무 일정","Mon–Fri (5-day)":"월–금 (주 5일)","Next increment":"다음 인상일","Gender":"성별","Female":"여성","Male":"남성","Employment status":"고용 상태","Probation end":"수습 종료일"};
const KO_MONTHS={Jan:"1\uc6d4",Feb:"2\uc6d4",Mar:"3\uc6d4",Apr:"4\uc6d4",May:"5\uc6d4",Jun:"6\uc6d4",Jul:"7\uc6d4",Aug:"8\uc6d4",Sep:"9\uc6d4",Oct:"10\uc6d4",Nov:"11\uc6d4",Dec:"12\uc6d4"};
const KO_MONTH_RE=/(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ?\d/;
const KO_PATTERNS=[
[/^in (\d+) weeks?$/,"$1주 후"],
[/^in (\d+) months?$/,"$1개월 후"],
[/^in (\d+) days?$/,"$1일 후"],
[/^Active (\d+)m ago$/,"$1분 전 활동"],
[/^Active (\d+)h ago$/,"$1시간 전 활동"],
[/^Active (\d+)d ago$/,"$1일 전 활동"],
[/^Active (\d+)w ago$/,"$1주 전 활동"],
[/^Blocked (\d+)w ago$/,"$1주 전 차단됨"],
[/^(\d+)h left$/,"$1시간 남음"],
[/^(\d+)h\/year$/,"연 $1시간"],
[/^(\d+)d ago$/,"$1일 전"],
[/^(\d+)w ago$/,"$1주 전"],
[/^(\d+)% read$/,"$1% 읽음"],
[/^(\d+)% signed$/,"$1% 서명 완료"],
[/^Showing (\d+) of (\d+) employees$/,"직원 $2명 중 $1명 표시"],
[/^Welcome, (.+)$/,"$1 님, 환영합니다"],
[/^Across (\d+) departments$/,"$1개 부서"],
[/^Waiting on Manager review$/,"매니저 검토 대기 중"],
[/^Waiting on HR review$/,"HR 검토 대기 중"],
[/^Waiting on Finance Team review$/,"재무팀 검토 대기 중"],
[/^Waiting on (.+) review$/,"$1 검토 대기 중"],
[/^Updated (.+)$/,"업데이트: $1"],
[/^(.+) request cancelled$/,"$1 신청 취소됨"],
[/^(.+) action completed$/,"$1 작업 완료"],
[/^(.+) action opened$/,"$1 작업 열림"],
[/^(.+) deleted and recorded in Activity Logs$/,"$1 삭제됨 · 활동 로그에 기록됨"],
[/^(.+) downloaded$/,"$1 다운로드됨"],
[/^(.+) removed from the team$/,"$1 님이 팀에서 제거됨"],
[/^(.+) template editor opened$/,"$1 템플릿 편집기 열림"],
[/^(.+) duplicated$/,"$1 복제됨"],
[/^(.+) archived$/,"$1 보관됨"],
[/^(.+) removed from asset inventory$/,"$1 자산 목록에서 제거됨"],
[/^(.+) deactivated$/,"$1 비활성화됨"],
[/^(.+) saved$/,"$1 저장됨"],
[/^(.+) cancelled$/,"$1 취소됨"],
[/^Password reset instructions sent to (.+)$/,"비밀번호 재설정 안내가 $1(으)로 전송됨"],
[/^Opened balance issue report for (.+)$/,"$1의 잔여 오류 신고 열림"],
[/^Language changed to (.+)$/,"언어가 $1(으)로 변경됨"],
[/^Reporting line editor opened for (.+)$/,"$1의 보고 라인 편집기 열림"],
[/^Rejected — (.+)$/,"거절됨 — $1"],
[/^Slack notifications cleared for (.+)$/,"$1의 슬랙 알림 초기화됨"],
[/^Signed in as (.+)$/,"$1(으)로 로그인됨"],
[/^Viewing as (.+)$/,"$1(으)로 보는 중"],
[/^(.+) moved to (.+)$/,"$1 → $2(으)로 변경됨"],
[/^(.+) marked (.+)$/,"$1 → $2(으)로 표시됨"],
[/^(.+?)['\u2019]s role changed to (.+)$/,(m,a,b)=>a+"\uc758 \uc5ed\ud560\uc774 "+(KO[b]??b)+"(\uc73c)\ub85c \ubcc0\uacbd\ub428"],
[/^User \u00b7 (.+)$/,"\uc0ac\uc6a9\uc790 \u00b7 $1"],
[/^New employee \u2014 (.+)$/,"\uc2e0\uaddc \uc9c1\uc6d0 \u2014 $1"],
[/^(\d+)h$/,"$1\uc2dc\uac04"],
[/^(\d+)y (\d+)m$/,"$1\ub144 $2\uac1c\uc6d4"],
[/^(.+?)['\u2019]s (.+)$/,(m,a,b)=>a+"\uc758 "+(KO[b]??b)],
[/^Showing (\d+) of (\d+) entries$/,"$2개 중 $1개 표시"],
[/^Showing (\d+) of (\d+) total users$/,"사용자 $2명 중 $1명 표시"],
[/^(\d+) people in the reporting line$/,"보고 라인 내 $1명"],
[/^(\d+) departments · (\d+) teams$/,"$1개 부서 · $2개 팀"],
[/^(\d+) teams$/,"팀 $1개"],
];

const LANGUAGES=[["ENG","English","🇺🇸"],["KOR","Korean","🇰🇷"]];
function LanguageSwitcher() {
  const {lang,setLang}=React.useContext(LangCtx);
  const [open,setOpen]=useState(false);
  const ref=useRef(null);
  useEffect(() => { const onDoc = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }; document.addEventListener("mousedown", onDoc); return () => document.removeEventListener("mousedown", onDoc); }, []);
  const current=LANGUAGES.find(l=>l[0]===lang);
  return <div className="filter-menu language-switch" ref={ref}>
    <button type="button" className="filter-menu-trigger" onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-label="Language"><span className="flag-badge">{current[2]}</span><span>{current[0]}</span><ChevronDown size={13}/></button>
    {open && <div className="filter-menu-popover">{LANGUAGES.map(([code,name,flag])=><button type="button" key={code} className={`profile-row ${code===lang?"selected":""}`} onClick={()=>{setLang(code);setOpen(false);announce(`Language changed to ${name}`)}}>
      <span className="flag-badge">{flag}</span>
      <span className="profile-row-copy"><strong>{name}</strong></span>
      {code===lang && <Check size={16}/>}
    </button>)}</div>}
  </div>;
}
function MoreMenu({ actions, label = "More" }) {
  const [open, setOpen] = useState(false);
  return <div className="more-menu-wrap">
    <IconButton icon={MoreHorizontal} label={label} onClick={() => setOpen(v => !v)}/>
    {open && <>
      <button className="more-menu-scrim" aria-label="Close menu" onClick={() => setOpen(false)}/>
      <div className="more-menu" role="menu">
        {actions.map(([itemLabel, Icon, itemOnClick, danger]) => <button role="menuitem" key={itemLabel} className={danger ? "danger" : ""} onClick={() => { itemOnClick(); setOpen(false); }}><Icon size={14}/>{itemLabel}</button>)}
      </div>
    </>}
  </div>;
}
function Button({ children, icon: Icon, kind = "primary", onClick, type = "button", ...props }) { return <button type={type} className={`btn ${kind}`} title={typeof children === "string" ? children : undefined} onClick={onClick || (()=>announce(`${children} action completed`))} {...props}>{Icon && <Icon size={17}/>}<span>{children}</span></button>; }
function Card({ children, className = "", ...props }) { return <section className={`card ${className}`} {...props}>{children}</section>; }
function PageTitle({ eyebrow, title, subtitle, actions, className = "" }) { const T=useT(); return <div className={`page-title ${className}`}><div>{eyebrow&&<span className="eyebrow">{typeof eyebrow==="string"?T(eyebrow):eyebrow}</span>}<h1>{typeof title==="string"?T(title):title}</h1><p>{typeof subtitle==="string"?T(subtitle):subtitle}</p></div>{actions && <div className="page-actions">{actions}</div>}</div>; }
function Toolbar({ children }) { return <div className="toolbar">{children}</div>; }
function SearchBox({ placeholder = "Search", value, onChange }) { return <label className="search-box"><Search size={17}/><input aria-label={placeholder} placeholder={placeholder} value={value || ""} onChange={e => onChange?.(e.target.value)}/></label>; }
function Select({ children, value, onChange, label, className }) { return <label className={`select-wrap${className?` ${className}`:""}`}>{label && <span>{label}</span>}<select value={value} onChange={e => onChange?.(e.target.value)}>{children}</select><ChevronDown size={14}/></label>; }
function Empty({ icon: Icon = FileText, title = "No records found", text = "There is nothing to display yet.", action }) { const T=useT(); return <div className="empty"><span><Icon size={24}/></span><h3>{T(title)}</h3><p>{T(text)}</p>{action}</div>; }
function ErrorState({ message = "Something went wrong while loading this data." }) { const T=useT(); return <div className="error-state"><AlertTriangle size={22}/><div><strong>{T("Unable to load data")}</strong><p>{T(message)}</p></div><Button kind="secondary" icon={RotateCcw}>{T("Try again")}</Button></div>; }

function DataTable({ columns, rows, renderActions, onRow, selectable, selected, onToggle, onToggleAll, getKey }) {
  const T=useT();
  const keyOf = (row, i) => getKey ? getKey(row, i) : i;
  return <div className="table-scroll responsive-table"><table><thead><tr>{selectable && <th className="checkbox-cell"><input type="checkbox" checked={rows.length>0 && selected?.size===rows.length} onChange={onToggleAll} aria-label="Select all"/></th>}{columns.map(c => <th key={c}>{typeof c==="string"?T(c):c}</th>)}{renderActions && <th>{T("Actions")}</th>}</tr></thead><tbody>{rows.map((row, i) => <tr key={i} onClick={() => onRow?.(row)} className={onRow ? "clickable" : ""}>{selectable && <td className="checkbox-cell" data-label="" onClick={e=>e.stopPropagation()}><input type="checkbox" checked={!!selected?.has(keyOf(row,i))} onChange={()=>onToggle(keyOf(row,i))} aria-label="Select row"/></td>}{row.map((cell, j) => <td data-label={columns[j]} key={j}>{j === row.length - 1 && ["Active","Inactive","Pending","Approved","Rejected","Completed","Cancelled","Expired","Available","Assigned","Open","Resolved"].includes(cell) ? <Status>{cell}</Status> : (typeof cell==="string"?T(cell):cell)}</td>)}{renderActions && <td data-label="Actions" onClick={e => e.stopPropagation()}>{renderActions(row, i)}</td>}</tr>)}</tbody></table></div>;
}

function Modal({ title, subtitle, children, onClose, wide = false, footer, onSave }) { const T=useT();
  const save=()=>{const dialog=document.querySelector(".modal");const missing=[...dialog.querySelectorAll("[required]")].filter(x=>!String(x.value||"").trim());dialog.querySelectorAll(".invalid").forEach(x=>x.classList.remove("invalid"));if(missing.length){missing.forEach(x=>x.classList.add("invalid"));missing[0].focus();announce("Complete the required fields before saving","error");return;}if(onSave)onSave();else announce(`${title} saved`);onClose();};
  return <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}><div className={`modal ${wide ? "wide" : ""}`} role="dialog" aria-modal="true" aria-label={T(title)}><header><div><h2>{T(title)}</h2>{subtitle && <p>{T(subtitle)}</p>}</div><IconButton icon={X} label="Close" onClick={onClose}/></header><div className="modal-body">{children}</div>{footer!==false && <footer>{footer || <><Button kind="secondary" onClick={onClose}>{T("Cancel")}</Button><Button icon={Check} onClick={save}>{T("Save")}</Button></>}</footer>}</div></div>;
}

// Three/four-segment approval progress bar (Applied → Manager → HR …), each segment coloured by outcome.
function ApprovalProgress({ steps }) {
  if (!steps) return null;
  return <div className="approval-progress"><div className="approval-progress-bar">{steps.map((s,i)=><i className={s.tone} key={i}/>)}</div><div className="approval-progress-labels">{steps.map((s,i)=><span key={i}>{s.label}</span>)}</div></div>;
}

// Timestamped decision history: who acted, at which stage, when, plus any comment/rejection reason.
function ApprovalTimeline({ steps, acknowledged }) {
  return <div className="timeline">{steps.map((s,i)=><div className={s.tone} key={i}><i/><span><strong>{s.label}<em> {s.detail}</em></strong><small>{s.time}</small>{s.note && <p className="timeline-note">{s.note}</p>}</span></div>)}{acknowledged && <div className="ack-banner"><Eye size={14}/><span><strong>Acknowledged by {acknowledged.by}</strong> · {acknowledged.time}</span></div>}</div>;
}

// Status-driven recovery actions for a leave/request record — matches what the live HRIS allows
// per outcome: fix-and-reapply on rejection, duplicate/reapply once cancelled or expired, and
// edit/cancel while still pending.
function RecoveryActions({ status, kind = "request", onAction }) {
  const T=useT();
  const act = (label) => onAction ? onAction(label) : announce(`${label} — ${kind}`);
  if (status === "Pending") return <div className="recovery-actions"><Button kind="secondary" icon={Edit3} onClick={()=>act("Edit request")}>{T("Edit")}</Button><Button kind="danger" icon={X} onClick={()=>act("Cancel request")}>{T("Cancel request")}</Button></div>;
  if (status === "Rejected") return <div className="recovery-actions"><Button icon={RotateCcw} onClick={()=>act("Fix and reapply")}>{T("Fix & reapply")}</Button></div>;
  if (status === "Cancelled" || status === "Expired") return <div className="recovery-actions"><Button kind="secondary" icon={Archive} onClick={()=>act("Duplicate request")}>{T("Duplicate")}</Button><Button icon={RotateCcw} onClick={()=>act("Reapply")}>{T("Reapply")}</Button></div>;
  if (status === "Approved") return <div className="recovery-actions"><Button kind="secondary" icon={X} onClick={()=>act("Request cancellation")}>{T("Request cancellation")}</Button></div>;
  return null;
}
// Small footer caption — never repeats the status word already shown as the card's badge; shows
// what's actually useful instead (who it's waiting on, or when it was decided).
function statusFootNote(d) { return d.status === "Pending" ? `Waiting on ${d.stage} review` : `Updated ${d.history[d.history.length-1].time}`; }
function Field({ label, required, children, hint, full = false }) { const native=React.isValidElement(children)&&typeof children.type==="string"&&["input","textarea","select"].includes(children.type); const control=children?(native?React.cloneElement(children,{required:required||children.props.required,"aria-required":required||undefined}):children):<input required={required} aria-required={required||undefined}/>; const T=useT(); return <label className={`field ${full ? "full" : ""}`}><span>{typeof label==="string"?T(label):label}{required && " *"}</span>{control}{hint && <small>{typeof hint==="string"?T(hint):hint}</small>}</label>; }
function BasicForm({ type }) { const T=useT();
  const forms = {
    employee: ["First name", "Last name", "Work email", "Phone number", "Job title", "Department", "Team", "Country", "Employment type", "Start date"],
    team: ["Team name", "Team code", "Department", "Team lead", "Description"],
    asset: ["Asset name", "Asset type", "Serial number", "Purchase date", "Purchase price", "Current value", "Status", "Assigned employee", "Location", "Notes"],
    user: ["First name", "Last name", "Email address", "Role", "Linked employee", "Temporary password"],
    leave: ["Employee", "Leave type", "Start date", "End date", "Duration", "Reason"],
    department: ["Department name", "Description"], entity: ["Entity name", "Country", "Address", "Registration number", "Tax number"],
    note: ["Note type", "Date", "Notes"], qualification: ["Qualification", "Institution", "Start date", "End date", "Grade", "Certificate"],
    identity: ["Document type", "Document number", "Country of issue", "Issue date", "Expiry date", "Document file"],
    salary: ["Effective date", "Gross salary", "Currency", "Tax deduction", "Pension deduction", "Other deductions", "Notes"],
    bank: ["Account name", "Bank name", "Account number", "Branch name", "SWIFT / BIC", "IBAN", "Country"],
    member: ["Employee", "Role in team", "Start date"],
  };
  return <div className="form-grid">{(forms[type] || []).map((f, i) => <Field key={f} label={f} required={i < 3} full={f === "Notes" || f === "Description" || f === "Reason"}><input type={f.toLowerCase().includes("date") ? "date" : "text"} placeholder={T(`Enter ${f.toLowerCase()}`)}/></Field>)}</div>;
}

const roleRules = {
  "Super Admin": ["Home","People","Requests","Assets & Documents","Reports","My Space","Settings"],
  "Admin": ["Home","People","Requests","Assets & Documents","Reports","My Space","Settings"],
  "Team Lead": ["My Space"],
  "Employee": ["My Space"],
};

const roleCapabilities = {
  "Super Admin": { managePeople:true, administer:true, quickCreate:true, peopleSearch:true, myTeam:true, approvals:true },
  "Admin": { managePeople:true, administer:true, quickCreate:true, peopleSearch:true, myTeam:true, approvals:true },
  "Team Lead": { managePeople:false, administer:false, quickCreate:false, peopleSearch:false, myTeam:true, approvals:true },
  "Employee": { managePeople:false, administer:false, quickCreate:false, peopleSearch:false, myTeam:true, approvals:false },
};

const roleIdentity = {
  "Team Lead": { name:"Ethan Walker", initials:"EW", title:"Product Design Team Lead", team:"BLK-UXI", manager:"Ismail Gorkem Kara", country:"Ghana", phone:"+233 24 000 0011", email:"ethan.walker@must.company", start:"14 Jan 2024", tenure:"2y 7m" },
  "Employee": { name:"Matilda Ipeh Anashie", initials:"MA", title:"Senior Product Designer", team:"BLK-UXI", manager:"Ismail Gorkem Kara", country:"Ghana", phone:"+233 24 000 0000", email:"matilda.anashie@must.company", start:"26 Feb 2025", tenure:"1y 4m" },
};

function roleHome(role) { return role === "Super Admin" || role === "Admin" ? "/dashboard" : "/my-dashboard"; }
const PREVIEW_DISPLAY_NAME = { Employee: "Sarah Miller", "Team Lead": "Ethan Miller" };
function roleProfile(role) { return roleIdentity[role] || roleIdentity.Employee; }

// A small self-service assistant: suggestion chips and free-text both resolve against real
// app data (employee records, computed hourly rates, leave/approvals pages) rather than a
// canned script, so answers stay consistent with what's actually in the directory.
function AskHris({ role, go, identity, scrolling, setScrolling }) {
  const T=useT();
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);
  const firstName = identity.name.split(" ")[0];
  const suggestions = useMemo(() => {
    const a = EMPLOYEE_DIRECTORY[0], b = EMPLOYEE_DIRECTORY[5];
    const list = [
      { text: `Take me to ${a.name}'s information`, to: `/employees/${slugify(a.name)}` },
      { text: `What is ${b.name}'s hourly rate?` },
      { text: "Who is on leave today?" },
    ];
    if (role !== "Employee") list.push({ text: "Open decision history" });
    return list;
  }, [role]);
  const [messages, setMessages] = useState(() => [{ from: "bot", text: `Hi ${firstName} — ask me for a person, a fact or a page.\nTry "${suggestions[0].text}".` }]);
  const [input, setInput] = useState("");
  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [messages, open]);

  const answerFor = (text) => {
    const q = text.toLowerCase();
    const person = EMPLOYEE_DIRECTORY.find(e => q.includes(e.name.toLowerCase()));
    if (person && (q.includes("rate") || q.includes("salary") || q.includes("pay"))) return { text: `${person.name}'s hourly rate is $${hourlyRate(person.name)}/hr.` };
    if (person) return { text: `Opening ${person.name}'s profile…`, to: `/employees/${slugify(person.name)}` };
    if (q.includes("leave") || q.includes("holiday") || q.includes("pto")) return { text: "Opening Leave Management…", to: "/leaves" };
    if (q.includes("history") || q.includes("decision") || q.includes("approv")) return role !== "Employee" ? { text: "Opening decision history…", to: "/approvals" } : { text: "You don't have access to decision history — ask your manager or HR." };
    if (q.includes("team")) return { text: "Opening your team…", to: "/my-team" };
    return { text: "I can help you find people, facts, and pages — try asking about an employee, their pay, or who's on leave today." };
  };

  const send = (text) => {
    if (!text.trim()) return;
    setMessages(m => [...m, { from: "user", text }]);
    setInput("");
    const res = answerFor(text);
    window.setTimeout(() => {
      setMessages(m => [...m, { from: "bot", text: res.text }]);
      if (res.to) window.setTimeout(() => { go(res.to); setOpen(false); }, 700);
    }, 350);
  };

  return <>
    {open && <div className="ask-hris-panel" role="dialog" aria-label="Ask HRIS">
      <div className="ask-hris-header">
        <span className="ask-hris-avatar"><Package size={20}/></span>
        <div><h3>{T("Ask HRIS")}</h3><p>{T("Find people, facts and pages — instantly")}</p></div>
        <button className="ask-hris-close" aria-label="Close Ask HRIS" onClick={() => setOpen(false)}><X size={18}/></button>
      </div>
      <div className="ask-hris-body" ref={bodyRef}>
        {messages.map((m, i) => <div className={`ask-hris-bubble ${m.from}`} key={i}>{m.text}</div>)}
        <div className="ask-hris-suggestions">
          {suggestions.map(s => <button key={s.text} onClick={() => send(s.text)}>{s.text}</button>)}
        </div>
      </div>
      <div className="ask-hris-input-row">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder={T("Ask about a person, a fact or a page…")} onKeyDown={e => { if (e.key === "Enter") send(input); }}/>
        <button className="ask-hris-send" aria-label="Send" onClick={() => send(input)}><Send size={16}/></button>
      </div>
    </div>}
    <button className={`ask-hris ${scrolling && !open ? "docked" : ""}`} aria-label={open ? "Close Ask HRIS" : "Ask HRIS"} onClick={() => { setScrolling(false); setOpen(v => !v); }}><MessageCircle size={16}/>{T("Ask HRIS")}</button>
  </>;
}
function LogoDefs() {
  return <svg width="0" height="0" style={{position:"absolute"}} aria-hidden="true"><symbol id="mc-logo" viewBox="0 0 247 68">    <rect width="16.8494" height="67.3976" fill="currentColor"/><rect x="25.2734" width="16.8494" height="67.3976" fill="currentColor"/><rect x="50.5469" width="16.8494" height="67.3976" fill="#018038"/>    <path d="M159.727 38.4254V21.4706H153.263V16.5684H172.114V21.4706H165.68V38.4254H159.727Z" fill="currentColor"/><path d="M143.582 38.4256C141.866 38.4256 140.211 38.2123 138.614 37.7859C137.038 37.3391 135.751 36.7704 134.754 36.0799L136.699 31.6322C137.637 32.2415 138.714 32.7492 139.931 33.1554C141.168 33.5412 142.395 33.7342 143.612 33.7342C144.43 33.7342 145.089 33.6631 145.587 33.5209C146.086 33.3585 146.445 33.1554 146.665 32.9117C146.904 32.6476 147.024 32.343 147.024 31.9978C147.024 31.5103 146.804 31.1245 146.365 30.8401C145.926 30.5558 145.358 30.3223 144.66 30.1395C143.961 29.9567 143.183 29.7739 142.325 29.5911C141.487 29.4083 140.639 29.1748 139.782 28.8905C138.944 28.6061 138.176 28.2406 137.477 27.7938C136.779 27.3267 136.21 26.7275 135.771 25.9964C135.332 25.245 135.113 24.3006 135.113 23.1633C135.113 21.8838 135.452 20.7262 136.131 19.6904C136.829 18.6547 137.866 17.822 139.243 17.1924C140.619 16.5628 142.335 16.248 144.39 16.248C145.767 16.248 147.114 16.4105 148.43 16.7355C149.767 17.0401 150.954 17.4971 151.992 18.1063L150.166 22.5845C149.168 22.0361 148.181 21.63 147.203 21.3659C146.226 21.0816 145.278 20.9395 144.36 20.9395C143.542 20.9395 142.884 21.0308 142.385 21.2136C141.886 21.3761 141.527 21.5995 141.308 21.8838C141.088 22.1681 140.979 22.4931 140.979 22.8587C140.979 23.3258 141.188 23.7015 141.607 23.9858C142.046 24.2498 142.615 24.4732 143.313 24.656C144.031 24.8185 144.809 24.9911 145.647 25.1739C146.505 25.3567 147.353 25.5902 148.191 25.8746C149.049 26.1386 149.827 26.5041 150.525 26.9713C151.223 27.4181 151.782 28.0172 152.201 28.7686C152.64 29.4997 152.859 30.4238 152.859 31.5408C152.859 32.7797 152.51 33.9271 151.812 34.9832C151.134 36.019 150.106 36.8516 148.73 37.4812C147.373 38.1108 145.657 38.4256 143.582 38.4256Z" fill="currentColor"/><path d="M122.363 38.4249C119.271 38.4249 116.857 37.5617 115.121 35.8355C113.385 34.1092 112.518 31.6619 112.518 28.4937V16.6738H118.443V28.3109C118.443 30.1388 118.792 31.4487 119.49 32.2408C120.209 33.0328 121.186 33.4288 122.423 33.4288C123.66 33.4288 124.628 33.0328 125.326 32.2408C126.024 31.4487 126.374 30.1388 126.374 28.3109V16.6738H132.209V28.4937C132.209 31.6619 131.341 34.1092 129.606 35.8355C127.87 37.5617 125.456 38.4249 122.363 38.4249Z" fill="currentColor"/><path d="M83.8672 38.4254V16.5684H88.7363L97.3993 31.4311H94.8303L103.254 16.5684H108.123L108.183 38.4254H102.746L102.687 25.2175H103.613L97.3096 36.2709H94.6809L88.1986 25.2175H89.3338V38.4254H83.8672Z" fill="currentColor"/><path d="M233.216 67.4746V58.5368L234.576 62.13L225.319 46.3379H231.501L238.185 57.7819H234.606L241.32 46.3379H246.998L237.771 62.13L239.072 58.5368V67.4746H233.216Z" fill="currentColor"/><path d="M203.911 67.4746V46.3379H208.753L220.218 60.4089H217.931V46.3379H223.693V67.4746H218.851L207.386 53.4036H209.673V67.4746H203.911Z" fill="currentColor"/><path d="M178.17 67.4746L187.325 46.3379H193.103L202.287 67.4746H196.184L189.014 49.2668H191.325L184.155 67.4746H178.17ZM183.177 63.368L184.688 58.9595H194.821L196.332 63.368H183.177Z" fill="currentColor"/><path d="M160.013 67.4746V46.3379H169.495C171.391 46.3379 173.021 46.6499 174.384 47.2739C175.767 47.898 176.834 48.8038 177.585 49.9915C178.335 51.1591 178.711 52.5481 178.711 54.1585C178.711 55.7487 178.335 57.1277 177.585 58.2952C176.834 59.4628 175.767 60.3686 174.384 61.0128C173.021 61.6368 171.391 61.9488 169.495 61.9488H163.272L165.88 59.352V67.4746H160.013ZM165.88 59.9862L163.272 57.2384H169.139C170.364 57.2384 171.273 56.9666 171.866 56.4231C172.478 55.8796 172.784 55.1247 172.784 54.1585C172.784 53.1721 172.478 52.4071 171.866 51.8636C171.273 51.3201 170.364 51.0484 169.139 51.0484H163.272L165.88 48.3006V59.9862Z" fill="currentColor"/><path d="M131.831 67.4746V46.3379H136.66L145.253 60.7108H142.705L151.06 46.3379H155.889L155.949 67.4746H150.556L150.497 54.702H151.415L145.164 65.3911H142.557L136.127 54.702H137.253V67.4746H131.831Z" fill="currentColor"/><path d="M117.167 67.7699C115.505 67.7699 113.972 67.5025 112.567 66.9678C111.162 66.433 109.935 65.6803 108.886 64.7097C107.857 63.7194 107.056 62.5706 106.482 61.2633C105.908 59.9561 105.621 58.52 105.621 56.9553C105.621 55.3905 105.908 53.9545 106.482 52.6472C107.056 51.34 107.857 50.2011 108.886 49.2305C109.935 48.2402 111.162 47.4776 112.567 46.9428C113.972 46.408 115.505 46.1406 117.167 46.1406C118.849 46.1406 120.383 46.408 121.768 46.9428C123.173 47.4776 124.39 48.2402 125.419 49.2305C126.448 50.2011 127.25 51.34 127.823 52.6472C128.417 53.9545 128.714 55.3905 128.714 56.9553C128.714 58.52 128.417 59.966 127.823 61.293C127.25 62.6003 126.448 63.7392 125.419 64.7097C124.39 65.6803 123.173 66.433 121.768 66.9678C120.383 67.5025 118.849 67.7699 117.167 67.7699ZM117.167 62.8974C117.959 62.8974 118.691 62.7588 119.364 62.4815C120.057 62.2042 120.65 61.808 121.145 61.293C121.659 60.7582 122.055 60.1244 122.332 59.3916C122.629 58.6587 122.777 57.8466 122.777 56.9553C122.777 56.0442 122.629 55.2321 122.332 54.519C122.055 53.7862 121.659 53.1622 121.145 52.6472C120.65 52.1125 120.057 51.7064 119.364 51.4291C118.691 51.1518 117.959 51.0132 117.167 51.0132C116.376 51.0132 115.634 51.1518 114.941 51.4291C114.269 51.7064 113.675 52.1125 113.16 52.6472C112.666 53.1622 112.27 53.7862 111.973 54.519C111.696 55.2321 111.558 56.0442 111.558 56.9553C111.558 57.8466 111.696 58.6587 111.973 59.3916C112.27 60.1244 112.666 60.7582 113.16 61.293C113.675 61.808 114.269 62.2042 114.941 62.4815C115.634 62.7588 116.376 62.8974 117.167 62.8974Z" fill="currentColor"/><path d="M95.2988 67.7699C93.6564 67.7699 92.1327 67.5124 90.7277 66.9975C89.3425 66.4627 88.1354 65.71 87.1065 64.7395C86.0973 63.7689 85.3057 62.63 84.7319 61.3227C84.158 59.9957 83.8711 58.5398 83.8711 56.9553C83.8711 55.3707 84.158 53.9248 84.7319 52.6175C85.3057 51.2905 86.0973 50.1417 87.1065 49.1711C88.1354 48.2006 89.3425 47.4578 90.7277 46.9428C92.1327 46.408 93.6564 46.1406 95.2988 46.1406C97.2182 46.1406 98.9299 46.4773 100.434 47.1508C101.957 47.8242 103.224 48.7948 104.233 50.0624L100.493 53.4494C99.8204 52.6571 99.0783 52.053 98.267 51.6371C97.4755 51.2211 96.585 51.0132 95.5956 51.0132C94.7447 51.0132 93.9631 51.1518 93.2507 51.4291C92.5383 51.7064 91.9249 52.1125 91.4104 52.6472C90.9157 53.1622 90.5199 53.7862 90.2231 54.519C89.9461 55.2519 89.8075 56.064 89.8075 56.9553C89.8075 57.8466 89.9461 58.6587 90.2231 59.3916C90.5199 60.1244 90.9157 60.7582 91.4104 61.293C91.9249 61.808 92.5383 62.2042 93.2507 62.4815C93.9631 62.7588 94.7447 62.8974 95.5956 62.8974C96.585 62.8974 97.4755 62.6894 98.267 62.2735C99.0783 61.8575 99.8204 61.2534 100.493 60.4611L104.233 63.8481C103.224 65.096 101.957 66.0665 100.434 66.7598C98.9299 67.4332 97.2182 67.7699 95.2988 67.7699Z" fill="currentColor"/>  </symbol><symbol id="mc-mark" viewBox="0 0 67.4 67.4"><rect width="16.8494" height="67.3976" fill="currentColor"/><rect x="25.2734" width="16.8494" height="67.3976" fill="currentColor"/><rect x="50.5469" width="16.8494" height="67.3976" fill="#018038"/></symbol></svg>;
}
function NavGroups({ groups, path, isActive, closedGroups, toggleGroup, onNavigate }) {
  const T=useT();
  return <div className="nav-scroll">{groups.map(([group, items]) => <div className="nav-group" key={group}><button className="nav-group-toggle" aria-expanded={!closedGroups.has(group)} onClick={()=>toggleGroup(group)}><span>{T(group)}</span><ChevronDown size={13} className={closedGroups.has(group)?"closed-arrow":""}/></button><div className={`nav-group-items ${closedGroups.has(group)?"closed":""}`}><div>{items.map(([label,to,Icon,badge]) => <button title={T(label)} key={to} className={isActive(to,path)?"active":""} onClick={()=>onNavigate(to)}><Icon size={18}/><span>{T(label)}</span>{badge && <span className="nav-badge">{badge}</span>}</button>)}</div></div></div>)}</div>;
}
function PreviewSidebar({ path, go, role, drawer, setDrawer, closedGroups, toggleGroup }) {
  const groups = role === "Team Lead" ? PREVIEW_NAV_GROUPS_TEAM_LEAD : PREVIEW_NAV_GROUPS_EMPLOYEE;
  const identity = roleProfile(role);
  const displayName = PREVIEW_DISPLAY_NAME[role] || identity.name;
  return <aside className={`sidebar ${drawer ? "open" : ""}`}>
    <div className="brand"><a className="brandmark" href="/my-dashboard" onClick={e=>{e.preventDefault();go("/my-dashboard")}}><svg className="logo-full"><use href="#mc-logo"/></svg><svg className="logo-mark"><use href="#mc-mark"/></svg></a></div>
    <NavGroups groups={groups} path={path} isActive={previewNavActive} closedGroups={closedGroups} toggleGroup={toggleGroup} onNavigate={to=>{go(to);setDrawer(false)}}/>
    <div className="side-user"><Avatar initials={identity.initials} small/><span><strong>{displayName}</strong><small>{role} · {identity.team}</small></span></div>
  </aside>;
}
function Shell({ path, go, children, role, setRole, open, isMySpace }) {
  const showRequest = isMySpace && path !== "/approvals" && path !== "/decision-history";
  role = role || "Super Admin";
  const isPreviewRole = role === "Team Lead" || role === "Employee";
  const T=useT();
  const [drawer, setDrawer] = useState(false); const [collapsed,setCollapsed]=useState(false); const [toast,setToast]=useState(null); const [globalQ,setGlobalQ]=useState(""); const [notices,setNotices]=useState(false); const [account,setAccount]=useState(false); const [quickCreate,setQuickCreate]=useState(false); const [scrolling,setScrolling]=useState(false); const [closedGroups,setClosedGroups]=useState(()=>new Set());
  const toggleGroup=(group)=>setClosedGroups(prev=>{const next=new Set(prev);next.has(group)?next.delete(group):next.add(group);return next});
  useEffect(()=>{const fn=e=>{setToast(e.detail);window.clearTimeout(window.__hrisToast);window.__hrisToast=window.setTimeout(()=>setToast(null),2600)};window.addEventListener("prototype-toast",fn);return()=>window.removeEventListener("prototype-toast",fn)},[]);
  useEffect(()=>{let t;const fn=()=>{setScrolling(true);window.clearTimeout(t);t=window.setTimeout(()=>setScrolling(false),700)};window.addEventListener("scroll",fn,{passive:true});return()=>{window.removeEventListener("scroll",fn);window.clearTimeout(t)}},[]);
  const identity=roleProfile(role);
  useEffect(()=>{setQuickCreate(false);setGlobalQ("")},[role]);
  const crumbParent = isPreviewRole ? "Pages" : path.startsWith("/teams/") ? "Teams" : path.startsWith("/employees/") ? "Employees" : path.startsWith("/documents/") ? "Documents" : null;
  const crumb = isPreviewRole ? (path === "/my-dashboard" ? "Dashboard" : (routeMeta[path]?.[0] || "Dashboard")) : path.startsWith("/teams/") ? (teams[Number(path.split("/").pop())]?.name || "Team Detail") : path.startsWith("/employees/") ? (EMPLOYEE_DIRECTORY.find(e=>slugify(e.name)===path.slice(11))?.name || "Matilda Ipeh Anashie") : path.startsWith("/documents/") ? ([...DOCUMENT_TEMPLATES,...COMPANY_DOCUMENTS].find(([n])=>slugify(n)===path.slice(11))?.[0] || "Document") : (routeMeta[path]?.[0] || "Dashboard");
  const searchHits=employees.filter(e=>e[0].toLowerCase().includes(globalQ.toLowerCase())).slice(0,4);
  return <div className={`app-shell role-${slugify(role)} ${collapsed?"sidebar-collapsed":""}`}>
    <LogoDefs/>{isPreviewRole ? <PreviewSidebar path={path} go={go} role={role} drawer={drawer} setDrawer={setDrawer} closedGroups={closedGroups} toggleGroup={toggleGroup}/> : <aside className={`sidebar ${drawer ? "open" : ""}`}><div className="brand"><a className="brandmark" href="/dashboard" onClick={e=>{e.preventDefault();go("/dashboard")}}><svg className="logo-full"><use href="#mc-logo"/></svg><svg className="logo-mark"><use href="#mc-mark"/></svg></a><IconButton icon={PanelLeftClose} label={drawer?"Close menu":collapsed?"Expand sidebar":"Collapse sidebar"} onClick={()=>drawer?setDrawer(false):setCollapsed(!collapsed)}/></div><NavGroups groups={navGroups.filter(([group])=>roleRules[role].includes(group)).map(([group,items])=>[group, items.filter(([label])=>role!=="Employee"||!["My Team","Approvals"].includes(label))])} path={path} isActive={adminNavActive} closedGroups={closedGroups} toggleGroup={toggleGroup} onNavigate={to=>{go(to);setDrawer(false)}}/></aside>}
    {drawer && <button className="scrim" aria-label="Close menu" onClick={() => setDrawer(false)}/>} 
    <div className="workspace"><header className="topbar"><button className="menu-btn" aria-label="Open menu" onClick={() => setDrawer(true)}><Menu size={20}/></button><svg className="mobile-logo"><use href="#mc-logo"/></svg>{crumbParent&&<div className="breadcrumbs"><span>{T(crumbParent)}</span><b>/</b><strong>{T(crumb)}</strong></div>}<div className="top-search"><Search size={17}/><input aria-label={T("Search employees globally")} placeholder={T(isPreviewRole ? "Search employees, documents…" : "Search employees…")} value={globalQ} onChange={e=>setGlobalQ(e.target.value)}/>{globalQ&&<div className="global-results">{searchHits.length?searchHits.map(e=><button key={e[0]} onClick={()=>{go("/employees/matilda");setGlobalQ("")}}><Avatar initials={e[5]} small/><span><strong>{e[0]}</strong><small>{T(e[1])}</small></span></button>):<p>{T("No employees found")}</p>}</div>}</div><div className="top-actions"><LanguageSwitcher/><div className="quick-create">{path==="/approvals"?null:showRequest?<Button icon={Plus} onClick={()=>open?.("new-request")}>{T("Request")}</Button>:<><Button icon={Plus} onClick={()=>{setQuickCreate(!quickCreate);setNotices(false);setAccount(false)}}>{T("Create")}</Button>{quickCreate&&<div className="quick-create-menu"><button onClick={()=>{open?.("employee");setQuickCreate(false)}}><UserPlus size={14}/>{T("Add Employee")}</button><button onClick={()=>{open?.("team");setQuickCreate(false)}}><Network size={14}/>{T("Create Team")}</button><button onClick={()=>{open?.("user");setQuickCreate(false)}}><UserCog size={14}/>{T("Invite User")}</button><button onClick={()=>{open?.("announcement");setQuickCreate(false)}}><Megaphone size={14}/>{T("Post Announcement")}</button></div>}</>}</div><span className="notif-wrap"><IconButton icon={Bell} label="Notifications" onClick={()=>{setNotices(!notices);setQuickCreate(false);setAccount(false)}}/><span className="notif-count">3</span></span><button className="account" title={`${identity.name} — ${role}`} aria-label={`Account menu for ${identity.name}, ${role}`} onClick={()=>{setAccount(!account);setQuickCreate(false);setNotices(false)}}><Avatar initials={identity.initials} photo="/assets/avatar-placeholder.svg"/><ChevronDown size={14}/></button></div>{notices&&<div className="header-popover notifications"><h3>{T("Needs your attention")}</h3><p>{T(role==="Employee"?"3 announcements and reminders need your attention.":role==="Team Lead"?"2 approvals and 1 reminder need your attention.":"2 approvals and 1 reported issue need review.")}</p><button onClick={()=>{go(role==="Employee"?"/my-dashboard":role==="Team Lead"?"/approvals":"/leaves");setNotices(false)}}>{T("Review now")}</button></div>}{account&&<div className="header-popover account-menu"><div className="account-menu-id"><Avatar initials={identity.initials} photo="/assets/avatar-placeholder.svg"/><span><strong>{identity.name}</strong><small>{role}</small></span></div><strong>{T("Quick links")}</strong><div className="profile-switch-list">{[["My Salary","/my-salary",CircleDollarSign],["My Documents","/my-documents",FileText],["My Feedback","/my-feedbacks",MessageSquareText]].map(([label,to,Icon])=><button className="profile-row" key={to} onClick={()=>{go(to);setAccount(false)}}><Icon size={16}/><span className="profile-row-copy"><strong>{T(label)}</strong></span></button>)}</div><div className="preview-switch"><strong>{T(isPreviewRole?"Switch profile":"Preview access")}</strong><p>{T("Prototype preview — lets you demo other role views. Not shipped to real users.")}</p><div className="profile-switch-list">{Object.keys(roleRules).map(item=>{const p=roleProfile(item); const displayName=(isPreviewRole&&PREVIEW_DISPLAY_NAME[item])?PREVIEW_DISPLAY_NAME[item]:p.name; return <button className={`profile-row ${role===item?"selected":""}`} key={item} onClick={()=>{setRole(item);setAccount(false);go(roleHome(item));announce(`Viewing as ${item}`)}}><Avatar initials={p.initials} small/><span className="profile-row-copy"><strong>{item}</strong><small>{displayName} · {T(p.title)}</small></span>{role===item&&<Check size={16}/>}</button>})}</div></div><button onClick={()=>{const key=role==="Team Lead"?"team-lead":role==="Employee"?"employee":"admin";setAccount(false);go(`/login/${key}`)}}>{T("Sign out")}</button></div>}</header><main className="content">{children}</main></div>
    <AskHris role={role} go={go} identity={identity} scrolling={scrolling} setScrolling={setScrolling}/>
    <button className={`report-issue ${scrolling?"docked":""}`} aria-label="Report an issue" onClick={()=>{setScrolling(false);announce("Issue report opened — describe the problem and attach evidence")}}><MessageSquareText size={16}/>{T("Report an issue")}</button>{toast&&<div className={`toast ${toast.tone||"success"}`} role="status">{T(toast.message)}<button aria-label="Dismiss notification" onClick={()=>setToast(null)}><X size={14}/></button></div>}
  </div>;
}

function DashboardIllustration() {
  return <svg className="dash-illustration" viewBox="0 0 260 210" fill="none" aria-hidden="true">
    {/* organic blob background */}
    <path d="M28 118C18 62 58 14 128 12C196 10 246 44 248 104C250 158 214 198 132 202C62 205 37 168 28 118Z" fill="#E6F4EC"/>
    <circle cx="48" cy="148" r="4" fill="#F2C293"/>
    <circle cx="224" cy="142" r="5" fill="#F2C29399"/>
    <circle cx="70" cy="16" r="3" fill="#B8DFC7"/>
    <circle cx="236" cy="60" r="3.5" fill="#fff"/>
    <path d="M22 96C28 88 30 78 28 68M30 98C36 92 40 84 40 76" stroke="#B8DFC7" strokeWidth="2" strokeLinecap="round"/>
    <path d="M240 176C234 170 231 162 232 154M236 180C230 176 226 170 224 163" stroke="#B8DFC7" strokeWidth="2" strokeLinecap="round"/>
    {/* browser window */}
    <rect x="34" y="22" width="196" height="118" rx="9" fill="#fff"/>
    <path d="M34 31C34 26 38 22 43 22H221C226 22 230 26 230 31V38H34V31Z" fill="#77C298"/>
    <circle cx="45" cy="30" r="2.4" fill="#fff"/><circle cx="53" cy="30" r="2.4" fill="#fff"/><circle cx="61" cy="30" r="2.4" fill="#fff"/>
    {/* sidebar: employee record nav */}
    <rect x="40" y="44" width="30" height="90" rx="4" fill="#EFF8F2"/>
    <circle cx="55" cy="56" r="6.5" fill="#77C298"/>
    <circle cx="55" cy="54" r="2.3" fill="#fff"/><path d="M50.5 59.5C51.5 57.5 53 56.6 55 56.6C57 56.6 58.5 57.5 59.5 59.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
    <rect x="45" y="68" width="20" height="3" rx="1.5" fill="#B8DFC7"/>
    <rect x="45" y="76" width="20" height="3" rx="1.5" fill="#B8DFC7"/>
    <rect x="45" y="84" width="14" height="3" rx="1.5" fill="#B8DFC7"/>
    <rect x="45" y="92" width="18" height="3" rx="1.5" fill="#B8DFC7"/>
    {/* main panel: chart with rising arrow */}
    <rect x="76" y="44" width="100" height="60" rx="4" fill="#F4FAF6"/>
    <rect x="84" y="82" width="8" height="14" rx="2" fill="#B8DFC7"/>
    <rect x="97" y="72" width="8" height="24" rx="2" fill="#77C298"/>
    <rect x="110" y="86" width="8" height="10" rx="2" fill="#B8DFC7"/>
    <rect x="123" y="66" width="8" height="30" rx="2" fill="#018038"/>
    <rect x="136" y="76" width="8" height="20" rx="2" fill="#77C298"/>
    <path d="M84 74L102 62L116 68L150 50" stroke="#018038" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M150 50L143 49M150 50L149 57" stroke="#018038" strokeWidth="2.2" strokeLinecap="round"/>
    <rect x="158" y="52" width="12" height="3" rx="1.5" fill="#B8DFC7"/>
    <rect x="158" y="59" width="9" height="3" rx="1.5" fill="#B8DFC7"/>
    {/* employee record rows */}
    <rect x="76" y="110" width="100" height="11" rx="3" fill="#EFF8F2"/>
    <circle cx="83" cy="115.5" r="3" fill="#77C298"/>
    <rect x="89" y="112" width="34" height="2.6" rx="1.3" fill="#B8DFC7"/><rect x="89" y="117" width="22" height="2.6" rx="1.3" fill="#DDEFE4"/>
    <rect x="76" y="125" width="100" height="11" rx="3" fill="#EFF8F2"/>
    <circle cx="83" cy="130.5" r="3" fill="#F2C293"/>
    <rect x="89" y="127" width="28" height="2.6" rx="1.3" fill="#B8DFC7"/><rect x="89" y="132" width="38" height="2.6" rx="1.3" fill="#DDEFE4"/>
    {/* right column: donut gauges */}
    <circle cx="203" cy="60" r="11" stroke="#EAD7C4" strokeWidth="4.5"/>
    <circle cx="203" cy="60" r="11" stroke="#018038" strokeWidth="4.5" strokeDasharray="62 69" strokeLinecap="round" transform="rotate(-90 203 60)"/>
    <text x="203" y="62.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="#018038" fontFamily="inherit">90%</text>
    <circle cx="203" cy="94" r="11" stroke="#DDEFE4" strokeWidth="4.5"/>
    <circle cx="203" cy="94" r="11" stroke="#77C298" strokeWidth="4.5" strokeDasharray="41 69" strokeLinecap="round" transform="rotate(-90 203 94)"/>
    <text x="203" y="96.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="#4E9B72" fontFamily="inherit">60%</text>
    <rect x="188" y="114" width="30" height="3" rx="1.5" fill="#B8DFC7"/>
    <rect x="188" y="122" width="22" height="3" rx="1.5" fill="#DDEFE4"/>
    {/* faceless admin at laptop */}
    <path d="M113 140C113 125 120 117 130 117C140 117 147 125 147 140C142 131 137 129 130 129C123 129 118 131 113 140Z" fill="#2B2320"/>
    <circle cx="130" cy="143" r="16" fill="#F7D2A6"/>
    <path d="M114 141C114 130 121 124 130 124C139 124 146 130 146 141C141 133 137 131 130 131C123 131 119 133 114 141Z" fill="#2B2320"/>
    <path d="M99 206V188C99 172 112 163 130 163C148 163 161 172 161 188V206Z" fill="#016A2D"/>
    <path d="M99 206V188C99 174 109 165 122 163C111 169 105 177 105 188V206Z" fill="#014F22"/>
    <path d="M122 163L130 171L138 163" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    {/* laptop lid facing viewer */}
    <rect x="98" y="172" width="64" height="34" rx="6" fill="#018038"/>
    <path d="M124 189C124 185 127 183 130 185C133 181 138 184 137 188C139 189 139 192 136 192H126C123 192 122 190 124 189Z" fill="#E6F4EC"/>
    {/* desk, mug */}
    <rect x="56" y="204" width="148" height="7" rx="3.5" fill="#014F22"/>
    <rect x="176" y="190" width="12" height="14" rx="3" fill="#F2C293"/>
    <path d="M188 193H191C193.5 193 193.5 200 191 200H188" stroke="#F2C293" strokeWidth="2.2"/>
    <path d="M180 186C180 184 182 184 182 182M185 186C185 184 187 184 187 182" stroke="#01803855" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>;
}
function Dashboard({ go, open, role }) {
  const [tab,setTab] = useState("MUST Space");
  const T=useT();
  const pipMembers = EMPLOYEE_DIRECTORY.filter(e=>e.status==="On PIP");
  const departments = DEPARTMENTS;
  const pendingApprovals = 2 + 3;
  const metrics = [
    ["Open issues",3,"red","1 high priority"],
    ["Pending approvals",pendingApprovals,"amber","2 leave · 3 services"],
    ["Members on PIP",pipMembers.length,pipMembers.length?"amber":"neutral",pipMembers.length?T("Review needed"):T("All clear")],
    ["On leave today",9,"neutral","Across 6 teams"],
    ["Active today",284,"green","99% of workforce"],
    ["Total headcount",287,"neutral","▲ 6 this quarter"],
  ];
  return <>
    <div className="tabs pill-tabs dashboard-view-tabs">{["MUST Space","My Space"].map(x=><button key={x} className={tab===x?"active":""} onClick={()=>setTab(x)}>{T(x)}</button>)}</div>
    {tab==="My Space" ? <MyDashboardContent role={role} go={go} open={open}/> : <>
    <div className="dash-banner">
      <div className="dash-banner-copy">
        <div className="dash-banner-eyebrow">{(role||"Super Admin").toUpperCase()} · {T("PEOPLE OPERATIONS")}</div>
        <h1>{T("Good morning, ")}<span>Matilda</span> 👋</h1>
        <p>{T("Here's what needs attention across MUST today — 12 August 2026.")}</p>
        <div className="dash-banner-actions">
          <Button icon={UserPlus} onClick={() => open("employee")}>{T("Add Employee")}</Button>
          <Button kind="secondary" icon={Megaphone} onClick={() => open("announcement")}>{T("Post Announcement")}</Button>
          <Button kind="secondary" icon={UserCog} onClick={() => open("user")}>{T("Invite User")}</Button>
          <Button kind="secondary" icon={BarChart3} onClick={() => go("/reports")}>{T("Run Report")}</Button>
        </div>
      </div>
      <DashboardIllustration/>
    </div>
    <div className="metric-grid">{metrics.map(([label,value,tone,caption]) => <Card className="metric" key={label}><span className="metric-label">{T(label)}</span><strong className={`metric-value ${tone}`}>{value}</strong><small className={`metric-caption ${tone}`}>{T(caption)}</small></Card>)}</div>
    <div className="admin-dashboard-grid lower">
      <Card className="attention-card"><div className="card-head"><div><h2><Bell size={18}/>{T("Needs your action")}</h2><p>{T("Approvals, reminders and system health")}</p></div><button onClick={()=>go("/leaves")}>{T("Review all")} <ChevronRight size={15}/></button></div>{[["2","Leave requests","One request overlaps with a teammate","Review","/leaves"],["3","Employee Services requests","Equipment and document requests","Review","/all-requests"],["1","Reported issue","Employee profile export failed","Open","/settings/platform"],["94","Feedback responses","Open across active cycles","Remind","/feedbacks"],["3","Missing manager","Employees with no reporting line set","Assign","/employees"]].map(([n,title,text,cta,to])=><button className="attention-row" key={title} onClick={()=>go(to)}><b>{n}</b><span><strong>{T(title)}</strong><small>{T(text)}</small></span><em>{T(cta)}</em></button>)}</Card>
      <Card><div className="card-head"><div><h2><History size={18}/>{T("Activity")}</h2><p>{T("Recent actions across the system")}</p></div><button onClick={()=>go("/activity-logs")}>{T("View all")} <ChevronRight size={15}/></button></div><div className="people-list">{[0,3,4,5,6].map(i=>ACTIVITY_LOG[i]).map((r,i)=><button key={i} onClick={()=>go("/activity-logs")}><Avatar initials={r[1]} small/><div><strong>{r[2]}</strong><span>{T(r[4])}</span></div><time>{r[0].split(",")[0]}</time></button>)}</div></Card>
    </div>
    <div className="admin-dashboard-grid lower">
      <Card><div className="card-head"><div><h2>{T("Team availability")}</h2><p>{T("Today across MUST")}</p></div><button onClick={()=>go("/org-chart")}>{T("Org chart")} <ChevronRight size={15}/></button></div><div className="availability-strip"><div><strong>278</strong><span>{T("Available")}</span></div><div><strong>9</strong><span>{T("Out today")}</span></div><div><strong>4</strong><span>{T("Starting soon")}</span></div></div></Card>
      <Card><div className="card-head"><div><h2><ShieldCheck size={18}/>{T("Members on PIP")}</h2></div>{pipMembers.length>0&&<button onClick={()=>go("/employees")}>{T("View all")} <ChevronRight size={15}/></button>}</div>{pipMembers.length?<div className="people-list">{pipMembers.map(e=><button key={e.name} onClick={()=>go(`/employees/${slugify(e.name)}`)}><Avatar initials={e.initials} small/><div><strong>{e.name}</strong><span>{T(e.title)}</span></div></button>)}</div>:<Empty icon={Check} title={T("Everyone is on track")} text={T("No employees are currently on a PIP.")}/>}</Card>
    </div>
    <div className="admin-dashboard-grid lower">
      <Card><div className="card-head"><div><h2><Building2 size={18}/>{T("By department")}</h2></div><button onClick={()=>go("/reports")}>Reports <ChevronRight size={15}/></button></div>{departments.map(([name,value])=><div className="department-bar" key={name}><span>{name}<b>{value}</b></span><i><em style={{width:`${Math.max(8,value/84*100)}%`}}/></i></div>)}</Card>
      <Card className="recent-card"><div className="card-head"><div><h2><CalendarDays size={19}/>{T("Recently onboarded")}</h2><p>{T("Newest employees across the company")}</p></div><button onClick={() => go("/employees")}>{T("View all")} <ChevronRight size={15}/></button></div><div className="people-list">{employees.slice(1,5).map((e,i) => <button key={e[0]} onClick={() => go("/employees/matilda")}><Avatar initials={e[5]} small/><div><strong>{e[0]}</strong><span>{T(e[1])} · {e[2]}</span></div><time>{["Aug 8","Aug 4","Jul 29","Jul 22"][i]}<small>2026</small></time></button>)}</div></Card>
    </div>
    </>}
  </>;
}

function PermissionDenied({go}) { const T=useT(); return <Card className="unlinked-state"><span><LockKeyhole size={25}/></span><h2>{T("You don’t have access to this page")}</h2><p>{T("Your current role does not include this permission. Switch role preview or return to your dashboard.")}</p><Button kind="secondary" icon={ArrowLeft} onClick={()=>go("/my-dashboard")}>{T("Back to dashboard")}</Button></Card> }

const myActivities = [["Annual Leave","12–14 Aug · 3 days","Pending"],["Casual Leave","3 Jul · 1 day","Approved"],["Employment Letter","Requested 18 Jun","Completed"]];
const myPayments = [["June 2026 payslip","Salary · paid Jul 1","$588.00","Paid"],["May 2026 payslip","Salary · paid Jun 1","$560.00","Paid"]];
const myUpcoming = [["Birthday","Oct 9","in 3 months",Cake],["Work anniversary · 2yr","Feb 26","in 8 months",Crown],["Annual increment","Feb 26","in 8 months",TrendingUp]];
const TEAM_LEVELS = {Head:{color:"#016A2D",soft:"rgba(1,106,45,.12)"},Leader:{color:"#018038",soft:"rgba(1,128,56,.12)"},Senior:{color:"#0EA5E9",soft:"rgba(14,165,233,.14)"},Junior:{color:"#E08600",soft:"rgba(224,134,0,.14)"},Intern:{color:"#8B5CF6",soft:"rgba(139,92,246,.14)"},"Team member":{color:"#6b7280",soft:"rgba(107,114,128,.12)"}};
const TEAM_MEMBERS = [
  {initials:"DK",bg:"#242424",name:"David Kim",role:"Head of Blockchain Dp.",level:"Head",location:"Seoul, KR",email:"david.kim@must.company",phone:"+82 10 2345 6789",timezone:"Asia/Seoul (GMT+9)"},
  {initials:"MI",bg:"#016a2d",name:"Maya Ingram",role:"Project Leader · Product Designer",level:"Leader",location:"Singapore, SG",email:"maya.ingram@must.company",phone:"+65 8123 4567",timezone:"Asia/Singapore (GMT+8)"},
  {initials:"SG",bg:"#0a7d43",name:"Sophie Grant",role:"Senior Product Designer",level:"Senior",location:"Lahore, PK",email:"sophie.grant@must.company",phone:"+92 300 1234567",timezone:"Asia/Karachi (GMT+5)"},
  {initials:"FH",bg:"#c0392b",name:"Felix Harper",role:"Senior Visual Designer",level:"Senior",location:"London, UK",email:"felix.harper@must.company",phone:"+44 7700 900123",timezone:"Europe/London (GMT+0)"},
  {initials:"LO",bg:"#0a5c34",name:"Liam Ortega",role:"UI Designer",level:"Junior",location:"Manila, PH",email:"liam.ortega@must.company",phone:"+63 917 123 4567",timezone:"Asia/Manila (GMT+8)"},
  {initials:"AM",bg:"#016a2d",name:"Adam Mercer",role:"Video Editor",level:"Junior",location:"Karachi, PK",email:"adam.mercer@must.company",phone:"+92 321 7654321",timezone:"Asia/Karachi (GMT+5)"},
  {initials:"AK",bg:"#7a3fa0",name:"Aisha Khan",role:"Design Intern",level:"Intern",location:"Lahore, PK",email:"aisha.khan@must.company",phone:"+92 333 9876543",timezone:"Asia/Karachi (GMT+5)"},
];
function MyDashboardContent({role,go,open}) {
  const T=useT();
  const isLead=role==="Team Lead";
  const isAdminRole=role==="Super Admin"||role==="Admin";
  const canApprove=roleCapabilities[role].approvals;
  const pendingApprovals=canApprove?[...LEAVE_REQUESTS.filter(d=>d.manager==="Matilda Ipeh Anashie"&&d.status==="Pending").map(d=>({...d,kind:"leave"})),...REQUESTS.filter(d=>d.manager==="Matilda Ipeh Anashie"&&d.status==="Pending").map(d=>({...d,kind:"request"}))]:[];
  const bannerEyebrow=isAdminRole?"MY SPACE · PERSONAL WORKSPACE":isLead?"MY SPACE · TEAM LEAD":"MY SPACE · EMPLOYEE";
  const bannerName=isLead?"Ethan":"Matilda";
  const bannerSecondary=isLead?{label:"Team Requests",icon:Archive,to:"/approvals"}:{label:"My Team",icon:Users,to:"/my-team"};
  return <><div className="dash-banner"><div className="dash-banner-copy"><div className="dash-banner-eyebrow">{T(bannerEyebrow)}</div><h1>{T("Good morning, ")}<span>{bannerName}</span> 👋</h1><p>{T("Here’s what’s happening at MUST today — 12 August 2026.")}</p><div className="dash-banner-actions"><Button icon={FileText} onClick={()=>go("/my-salary")}>{T("View payslip")}</Button><Button kind="secondary" icon={bannerSecondary.icon} onClick={()=>go(bannerSecondary.to)}>{T(bannerSecondary.label)}</Button></div></div><DashboardIllustration/></div><div className="metric-grid four employee-metrics"><Card className="simple-metric"><span>{T("Hourly rate")}</span><strong>$1.50</strong><p>{T("per hour")}</p></Card><Card className="simple-metric"><span>{T("Latest payslip")}</span><strong>$588.00</strong><p>{T("June 2026 · 392 hrs")}</p></Card><Card className="simple-metric"><span>{T("Paid YTD")}</span><strong>$3,528.00</strong><p>{T("6 payslips")}</p></Card><Card className="simple-metric"><span>{T("Tenure")}</span><strong>1y 4m</strong><p>{T("since Feb 26, 2025")}</p></Card></div><div className="employee-dashboard-grid">{canApprove?<Card className="attention-card"><div className="card-head"><div><h2><span className="count-badge">{pendingApprovals.length}</span>{T("Requests awaiting your approval")}</h2></div><button onClick={()=>go("/approvals")}>{T("View all")} <ChevronRight size={15}/></button></div>{pendingApprovals.slice(0,2).map(d=><button className="approval-row" key={d.id} onClick={()=>open(d.kind==="leave"?"leave-detail":"request-detail",d)}><Avatar initials={d.initials} small/><span><strong>{d.employee}</strong><small>{T(d.type)} · {d.kind==="leave"?`${d.dates} · ${d.hours}`:d.summary}</small>{d.kind==="leave"&&d.overlap&&<em>{d.overlap}</em>}</span><b>{T("Review")}</b></button>)}<div className="active-request"><strong>{T("Your active request")}</strong><span>{T("Annual Leave · 12–14 Aug")}</span><Status>Pending</Status></div></Card>:<ActivityCard go={go}/>}{isAdminRole?<AdminAttentionPanel go={go}/>:<AttentionPanel go={go}/>}</div><div className="employee-dashboard-grid lower"><TeamAvailability/><div><Card className="holiday-card"><small>{T("NEXT PUBLIC HOLIDAY")}</small><h2>{T("Independence Day")}</h2><p>{T("Thu, 14 August · office closed")}</p><span>{T("2 days to go")}</span></Card><LeaveBalanceCard go={go}/></div></div><div className="employee-dashboard-grid lower" style={{alignItems:"stretch"}}><RecentPaymentsCard go={go}/><UpcomingCard/></div></>;
}
function MySpacePage({path,go,role,open}) {
  const T=useT();
  if(path==="/my-dashboard") return <MyDashboardContent role={role} go={go} open={open}/>;
  if(path==="/my-profile") return <RoleProfile role={role} go={go}/>;
  if(path==="/my-salary") return <><PageTitle title={T("My Salary")} subtitle={T("Payslips and salary history")} actions={<Button icon={Download}>{T("Download latest")}</Button>}/><div className="metric-grid three employee-metrics"><Card className="simple-metric"><span>{T("Latest net pay")}</span><strong>$588.00</strong><p>{T("June 2026")}</p></Card><Card className="simple-metric"><span>{T("Hourly rate")}</span><strong>$1.50</strong><p>{T("effective Feb 2025")}</p></Card><Card className="simple-metric"><span>{T("Hours")}</span><strong>392</strong><p>{T("June 2026")}</p></Card></div><Card className="payslip-card"><DataTable columns={[T("Pay period"),T("Hours"),T("Gross"),T("Deductions"),T("Net"),T("Status")]} rows={[["June 2026","392","$628.00","$40.00","$588.00","Completed"],["May 2026","376","$601.00","$38.00","$563.00","Completed"]]} renderActions={()=> <IconButton icon={Download} label="Download payslip"/>}/></Card></>;
  if(path==="/my-documents") return <><PageTitle title={T("My Documents")} subtitle={T("Documents shared with you")}/><Card><DataTable columns={[T("Document"),T("Category"),T("Shared"),T("Status")]} rows={[["Employment Contract","Contract","26 Feb 2025","Completed"],["Employee Handbook","Policy","1 Aug 2026","Active"],["NDA","Legal","26 Feb 2025","Completed"]]} renderActions={()=> <IconButton icon={Download} label="Download document"/>}/></Card></>;
  if(path==="/my-team") { const levelsUsed=[...new Set(TEAM_MEMBERS.map(m=>m.level||"Team member"))].sort((a,b)=>Object.keys(TEAM_LEVELS).indexOf(a)-Object.keys(TEAM_LEVELS).indexOf(b)); return <><PageTitle eyebrow="Blockchain Dp." title={T("My Team")} subtitle={T("The people you work with, colour-coded by role.")}/><div className="tm-banner"><div className="tmb-stats"><div className="tmb-stat"><b>{TEAM_MEMBERS.length}</b><span>{T("Team members")}</span></div><div className="tmb-div"/><div className="tmb-stat"><b>5</b><span>{T("Countries")}</span></div><div className="tmb-div"/><div className="tmb-stat"><b>4</b><span>{T("Time zones")}</span></div></div><div className="tm-legend">{levelsUsed.map(name=><span key={name}><i style={{background:TEAM_LEVELS[name].color}}/>{name}</span>)}</div></div><div className="tm-grid">{TEAM_MEMBERS.map(m=><TeamMemberCard key={m.name} m={m}/>)}</div></>; }
  if(path==="/my-feedbacks") return <><PageTitle title={T("My Feedback")} subtitle={T("Feedback cycles and responses")}/><Card><DataTable columns={[T("Cycle"),T("Reviewer"),T("Due date"),T("Progress"),T("Status")]} rows={[["Q3 Performance Review","Ismail Gorkem Kara","20 Aug 2026","3 of 5 answers","Pending"],["Probation Review","Sneha Gupta","26 May 2025","5 of 5 answers","Completed"]]} renderActions={(r)=> <Button kind="secondary">{r[4]==="Completed"?"View":"Continue"}</Button>}/></Card></>;
  if(path==="/my-leaves") return <MyLeavesPage open={open}/>;
  if(path==="/leave-holidays") return <LeaveHolidaysPage go={go}/>;
  if(path==="/requests") return <MyRequestsPage open={open}/>;
  if(path==="/sops") return <><PageTitle title={T("SOPs & Policies")} subtitle={T("Company standard operating procedures and policies")}/><Card><Empty icon={FileText} title={T("No SOPs published yet")} text={T("Standard operating procedures and policy documents will appear here once published.")}/></Card></>;
  return <TeamApprovalsPage open={open} role={role} path={path}/>;
}
function ActivityCard({go}) { const T=useT(); return <Card><div className="card-head"><div><h2>{T("Latest activity")}</h2><p>{T("Your most recent requests")}</p></div><button onClick={()=>go("/my-leaves")}>{T("See all")} <ChevronRight size={15}/></button></div>{myActivities.slice(0,2).map(([name,date,status])=><div className="activity-item" key={name}><span><CalendarDays size={18}/></span><div><strong>{name}</strong><small>{date}</small></div><Status>{status}</Status></div>)}</Card> }
const myPublicHolidays = [["Independence Day","Office closed","Thu, 14 Aug","in 5 weeks"],["Eid Milad un-Nabi","Public holiday","Fri, 4 Sep","in 9 weeks"],["Iqbal Day","Public holiday","Mon, 9 Nov","in 4 months"]];
const myTeamOnLeave = [["SG","Sophie Grant","Product Designer","Annual · back Mon"],["FH","Felix Harper","Visual Designer","Sick · today"],["AM","Adam Mercer","Video Editor","WFH · today"]];
const UPCOMING_TEAM_HOLIDAYS = [
  {flag:"🇸🇬", country:"Singapore", teammates:1, holiday:"National Day", date:"Mon, Aug 10, 2026", eta:"in 18 days", avatars:["MI"]},
  {flag:"🇵🇰", country:"Pakistan", teammates:3, holiday:"Independence Day", date:"Fri, Aug 14, 2026", eta:"in 22 days", avatars:["SG","AM","AK"]},
  {flag:"🇰🇷", country:"South Korea", teammates:1, holiday:"Liberation Day", date:"Sat, Aug 15, 2026", eta:"in 23 days", avatars:["DK"]},
  {flag:"🇵🇭", country:"Philippines", teammates:1, holiday:"Ninoy Aquino Day", date:"Fri, Aug 21, 2026", eta:"in 29 days", avatars:["LO"]},
  {flag:"🇬🇧", country:"United Kingdom", teammates:1, holiday:"Summer Bank Holiday", date:"Mon, Aug 31, 2026", eta:"in 39 days", avatars:["FH"]},
];
function PublicHolidaysCard() { const T=useT(); return <Card><div className="card-head"><div><h2><Flag size={18}/>{T("Public holidays")}</h2><p>{T("Lahore, PK · 2026")}</p></div><button onClick={()=>announce("Showing all public holidays")}>{T("See all")}</button></div><div className="people-list">{myPublicHolidays.map(([name,sub,date,eta])=><div className="person-row" key={name}><span className="team-icon"><Flag size={18}/></span><div><strong>{T(name)}</strong><span>{T(sub)}</span></div><time>{T(date)}<small>{T(eta)}</small></time></div>)}</div></Card> }
function TeamOnLeaveCard({go}) { const T=useT(); return <Card><div className="card-head"><div><h2>{T("Team on leave")}</h2><p>{T("Coming up this week")}</p></div><button onClick={()=>go("/my-team")}>{T("My Team")} <ChevronRight size={15}/></button></div><div className="people-list">{myTeamOnLeave.map(([ini,name,role,note])=>{ const tone=note.startsWith("Annual")?"annual":note.startsWith("Sick")?"sick":"wfh"; return <div className="person-row" key={name}><Avatar initials={ini} small/><div><strong>{name}</strong><span>{T(role)}</span></div><span className={`status ${tone}`}>{T(note)}</span></div>; })}</div></Card> }
function UpcomingTeamHolidaysCard() { const T=useT(); return <Card><div className="card-head"><div><h2>{T("Upcoming Team holidays")}</h2><p>{T("Nearing holidays by country · through next month")}</p></div></div><div className="th-list">{UPCOMING_TEAM_HOLIDAYS.map(c=><div className="th-country" key={c.country}><div className="th-country-head"><span className="th-flag">{c.flag}</span><div className="th-country-text"><strong>{T(c.country)}</strong><span>{c.teammates}{T(c.teammates>1?" teammates":" teammate")}</span></div><div className="avatar-stack">{c.avatars.map((a,i)=><span key={a+i} style={avatarStyle(a)}>{a}</span>)}</div></div><div className="th-holiday"><i/><div><strong>{T(c.holiday)}</strong><span>{T(c.date)}</span></div><b>{T(c.eta)}</b></div></div>)}</div></Card> }
function AttentionPanel({go}) { const T=useT(); return <Card className="attention-card"><div className="card-head"><div><h2><Bell size={18}/>{T("Needs your attention")}</h2><p>{T("Announcements and reminders")}</p></div><button onClick={()=>announce("All reminders marked as read")}>{T("Mark all read")}</button></div>{[["OKRs pending to fill","Complete your objectives","Due Jul 20"],["New document to sign","Awaiting your signature","Sign"],["Give peers feedback","Take a moment for your team","Feedback"]].map(([title,text,cta])=><button className="attention-row" key={title}><span><strong>{title}</strong><small>{text}</small></span><em>{cta}</em></button>)}</Card> }
// Admin-only "My Space" variant of AttentionPanel — deliberately a separate component (not a role
// branch inside AttentionPanel) so Employee/Team Lead's dashboard can never be changed by editing this.
function AdminAttentionPanel({go}) { const T=useT(); return <Card className="attention-card"><div className="card-head"><div><h2><Bell size={18}/>{T("Needs your attention")}</h2><p>{T("Waiting on you to act")}</p></div><button onClick={()=>go("/my-leaves")}>{T("My requests")} <ChevronRight size={15}/></button></div>{[["New document to sign","Awaiting your signature","Sign","/my-documents"],["Give peers feedback","Take a moment for your team","Feedback","/my-feedbacks"],["Leave request pending","Annual Leave · 12–14 Aug · with your lead","Track","/my-leaves"]].map(([title,text,cta,to])=><button className="attention-row" key={title} onClick={()=>go(to)}><span><strong>{title}</strong><small>{text}</small></span><em>{cta}</em></button>)}</Card> }
function TeamAvailability(){ const T=useT(); return <Card><div className="card-head"><div><h2>{T("Who’s out")}</h2><p>{T("Your team, this week")}</p></div><button>{T("Team calendar")}</button></div><div className="week-strip">{[["Mon","10"],["Tue","11"],["Wed","12"],["Thu","13"],["Fri","14"]].map(([day,date])=><span className={day==="Wed"?"active":""} key={day}><small>{day}</small><strong>{date}</strong></span>)}</div><div className="people-list">{[["SG","Sophie Grant","Annual · 12–14 Aug"],["FH","Felix Harper","Sick · Today"],["AM","Adam Mercer","WFH · Today"]].map(([ini,name,note])=><button key={name}><Avatar initials={ini} small/><div><strong>{name}</strong><span>{note}</span></div></button>)}</div></Card> }
function LeaveBalanceCard({go}) { const T=useT(); return <Card className="leave-balance-card"><div className="card-head"><h2><CalendarDays size={19}/>{T("Annual Leave")}</h2><button onClick={()=>go?.("/leave-holidays")}><ChevronRight size={16}/></button></div><div className="leave-summary"><strong>7</strong><span>{T("days left")}<br/>{T("of 15 days")}</span><b>{T("47% available")}</b></div><div className="progress"><i/></div></Card> }
function reservedHoursFor(typeName) { return MY_LEAVES.filter(r=>r.status==="Pending"&&r.type===typeName.replace(/Leaves$/,"Leave")).reduce((sum,r)=>sum+(parseInt(r.hours,10)||0),0); }
function LeaveTypeBalancesGrid() { const T=useT(); return <div className="profile-balance-grid leave-type-balance-grid">{LEAVE_TYPES.map(t=>{
  const pct=t.unlimited?100:Math.round(t.leftHours/t.totalHours*100);
  const used=t.unlimited?null:t.totalHours-t.leftHours;
  const reserved=t.unlimited?0:reservedHoursFor(t.name);
  const Icon=t.icon;
  return <div key={t.key}>
    <span className={`leave-tile-icon ${t.tone}`}><Icon size={16}/></span>
    <strong>{T(t.name.replace(/Leaves$/,"Leave"))}</strong>
    <p>{t.unlimited?<b className="inf">∞</b>:<><b>{t.leftHours}</b> {T("hrs left")}</>}</p>
    {!t.unlimited&&<small className="lvb-of">{T("of")} {t.totalHours} {T("hrs")}</small>}
    <div className="lvb-bar-row"><i><em style={{width:`${pct}%`}}/></i><span>{t.unlimited?"∞":`${pct}%`}</span></div>
    {!t.unlimited&&<div className="lvb-brk">
      <p><span>{T("Entitlement")}</span><b>{t.totalHours} hrs</b></p>
      <p><span>{T("Used")}</span><b>{used} hrs</b></p>
      {reserved>0&&<p className="reserved"><span>{T("Reserved · pending")}</span><b>{reserved} hrs</b></p>}
    </div>}
    <button type="button" className="lvb-report-link" onClick={()=>announce(`Opened balance issue report for ${t.name}`)}>{T("Report a balance issue")}</button>
  </div>;
})}</div> }
function RecentPaymentsCard({go}) { const T=useT(); return <Card><div className="card-head"><div><h2>{T("Recent payments")}</h2></div><button onClick={()=>go("/my-salary")}>{T("View all")} <ChevronRight size={15}/></button></div>{myPayments.map(([name,sub,amount,status])=><div className="activity-item" key={name}><span><CircleDollarSign size={18}/></span><div><strong>{name}</strong><small>{sub}</small></div><Status>{status}</Status><b>{amount}</b></div>)}</Card> }
function UpcomingCard() { const T=useT(); return <Card><div className="card-head"><h2>{T("Upcoming")}</h2></div>{myUpcoming.map(([name,date,eta,Icon])=><div className="activity-item" key={name}><span><Icon size={18}/></span><div><strong>{name}</strong><small>{date}</small></div><small>{eta}</small></div>)}</Card> }
function TeamMemberCard({m}) { const T=useT(); const level=m.level||"Team member"; const lvl=TEAM_LEVELS[level]||TEAM_LEVELS["Team member"]; return <div className="tm-card" style={{"--lvl":lvl.color}}><div className="tm-top"><div className="tm-avwrap"><span className="avatar" style={{background:m.bg}}>{m.initials}</span></div><span className="tm-lvl" style={{color:lvl.color,background:lvl.soft}}>{level}</span></div><div className="tm-name">{m.name}</div><div className="tm-role">{m.role}</div><div className="tm-details"><div className="tm-row"><MapPin size={15}/>{m.location}</div><div className="tm-row"><Mail size={15}/>{m.email}</div><div className="tm-row"><Phone size={15}/>{m.phone}</div><div className="tm-row"><Clock3 size={15}/>{m.timezone}</div></div><a className="tm-slack" href="https://app.slack.com/client" target="_blank" rel="noopener noreferrer"><MessageCircle size={16}/>{T("Message on Slack")}</a></div> }

function ProfileField({icon:Icon,label,value}) { const T=useT(); return <div className="self-profile-field"><span><Icon size={18}/></span><div><small>{label}</small><strong>{typeof value==="string"?T(value):value}</strong></div></div>; }
function RoleProfile({role,go}) {
const T=useT();
  const person=roleProfile(role); const isLead=role==="Team Lead";
  return <div className="self-profile">
    <PageTitle title={T(`Welcome, ${person.name.split(" ")[0]}`)} subtitle={T("Your personal information")} actions={<Button kind="secondary" icon={Edit3} onClick={()=>announce("Profile change request opened")}>{T("Request a change")}</Button>}/>
    <Card className="self-profile-hero"><Avatar initials={person.initials}/><div><h1>{person.name}</h1><p>{T(person.title)} · {T("Blockchain Dp.")}</p><span><Status>{T("Active")}</Status><b>{T(isLead?"Team Lead":"Regular")}</b></span></div></Card>
    <Card className="self-profile-section"><h2>{T("Personal information")}</h2><div className="self-profile-grid"><ProfileField icon={Mail} label={T("Email")} value={person.email}/><ProfileField icon={Phone} label={T("Phone")} value={person.phone}/><ProfileField icon={Building2} label={T("Department")} value="Blockchain Dp."/><ProfileField icon={BriefcaseBusiness} label={T("Company entity")} value="MUST SG"/><ProfileField icon={BriefcaseBusiness} label={T("Designation")} value={person.title}/><ProfileField icon={CalendarDays} label={T("Joining date")} value={person.start}/><ProfileField icon={Clock3} label={T("Tenure")} value={person.tenure}/><ProfileField icon={BriefcaseBusiness} label={T("Work schedule")} value="Mon–Fri (5-day)"/><ProfileField icon={CircleDollarSign} label={T("Hourly rate")} value="$1.50/hr"/><ProfileField icon={Cake} label={T("Date of birth")} value="May 14, 1997"/><ProfileField icon={TrendingUp} label={T("Next increment")} value="Feb 26, 2027"/><ProfileField icon={IdCard} label={T("Gender")} value="Female"/><ProfileField icon={BriefcaseBusiness} label={T("Employment status")} value="Regular"/><ProfileField icon={CalendarDays} label={T("Probation end")} value="May 26, 2025"/><ProfileField icon={Globe2} label={T("Time zone")} value="17:00 ~ 02:00 (KST)"/><ProfileField icon={Globe2} label="LinkedIn" value={<a className="profile-link" href="https://www.linkedin.com/in/matilda-anashie" target="_blank" rel="noopener noreferrer">www.linkedin.com/in/matilda-anashie</a>}/></div><div className="skill-list"><small>{T("Tech stack")}</small><div>{["Maze","Visual Studio Code","GitHub","Adobe Illustrator","Rive","Figma"].map(x=><span key={x}>{x}</span>)}</div></div></Card>
    <Card className="self-profile-section"><h2>{T("Emergency contact & address")}</h2><div className="self-profile-grid"><ProfileField icon={IdCard} label={T("Emergency contact")} value="Mildred Anashie"/><ProfileField icon={Phone} label={T("Emergency phone")} value="+234 814 350 9138"/><ProfileField icon={MapPin} label={T("City")} value="FCT Abuja"/><ProfileField icon={Globe2} label={T("Country")} value="Nigeria"/><ProfileField icon={MapPin} label={T("Address")} value="FCT Abuja, Nigeria"/></div></Card>
    <Card className="self-profile-section"><h2>{T("Team & reporting")}</h2><div className="reporting-copy"><span>{T("Department & team")}</span><strong>Blockchain Dp. <ChevronRight size={14}/> UX/UI Team <b>BLK-UXI</b></strong></div><ProfileField icon={Users} label={T("Reports to")} value={person.manager}/>{isLead&&<button className="profile-team-link" onClick={()=>go("/my-team")}>{T("View your team")} <ChevronRight size={15}/></button>}</Card>
    <LeaveBalanceCard go={go}/>
    <div className="self-profile-split"><Card className="self-profile-section"><h2>{T("ID & passport")}</h2><Empty icon={IdCard} title={T("No identity documents")} text={T("Nothing has been recorded yet.")}/></Card><Card className="self-profile-section"><h2>{T("Education")}</h2><Empty icon={GraduationCap} title={T("No education records")} text={T("Nothing has been added yet.")}/></Card></div>
    <Card className="self-profile-section"><div className="card-head"><div><h2><Landmark size={18}/>Bank details</h2><p>{T("Recipient information — must match the bank's records.")}</p></div><button onClick={()=>announce("Bank detail change request opened")}><Edit3 size={14}/>{T("Request change")}</button></div><Info rows={[["Bank name","Guaranty Trust Bank (GTB) PLC"],["Account number","•••• •••• 4634"],["Account type","Single sole owner"],["Branch","Lagos, Nigeria"],["SWIFT code","GTBINGLAXXX"],["Account holder","Anashie Matilda Ipeh"]]}/></Card>
    <Card className="self-profile-section"><h2>{T("Assigned assets")}</h2><Empty icon={PackagePlus} title={T("No assets issued to you")} text={T("No assignment history yet.")}/></Card>
  </div>;
}

// Employee self-service leave list — one card per request with type, status, exact time window,
// timezone, hours, reason, current stage, attachment indicator and status-driven recovery actions.
function MyLeavesPage({open}) {
const T=useT();
  const [rows,setRows]=useState(MY_LEAVES);
  const [tab,setTab]=useState("All Leaves");
  const cancel=(rec)=>setRows(rows.map(r=>r.id===rec.id?{...r,status:"Cancelled",stage:"Done",progress:null,history:[...r.history,{label:"Cancelled",detail:"by Matilda Ipeh Anashie",time:"Just now",tone:"cancelled"}]}:r)) || announce(`${rec.type} request cancelled`);
  const pendingCount=rows.filter(r=>r.status==="Pending").length;
  const approvedCount=rows.filter(r=>r.status==="Approved").length;
  const rejectedCount=rows.filter(r=>r.status==="Rejected").length;
  const tabCounts={"Pending":pendingCount,"Approved":approvedCount,"Rejected":rejectedCount,"All Leaves":rows.length};
  const visible=rows.filter(r=>tab==="All Leaves"||r.status===tab);
  return <>
    <PageTitle title={T("My Leaves")} subtitle={T("Your leave requests.")}/>
    <Card className="raised">
    <div className="tabs pill-tabs in-card">{["All Leaves","Pending","Approved","Rejected"].map(x=><button key={x} className={tab===x?"active":""} onClick={()=>setTab(x)}>{T(x)}<span>{tabCounts[x]}</span></button>)}</div>
    {visible.length?<div className="leave-card-list">{visible.map(d=><div className="record-card" key={d.id}>
      <div className="record-card-head"><h3><i className={`tone-dot ${d.tone}`}/>{T(d.type)}</h3><Status>{d.status}</Status></div>
      <div className="record-card-meta">
        <span><CalendarDays size={13}/>{d.dates}</span>
        <span><Clock3 size={13}/>{d.time} · {d.timezone}</span>
        <span className="meta-strong">{d.hours}</span>
      </div>
      <div className="record-card-submeta">
        <span>{T("Submitted")} {d.submitted}</span>
        <span>{d.manager}</span>
        {!!d.attachments && <span><FileText size={13}/>{d.attachments}{T(d.attachments>1?" files":" file")}</span>}
      </div>
      <div className="record-card-reason"><span>{T("Reason")}</span><p>{d.reason}</p></div>
      <div className="record-card-foot">
        <small>{T(statusFootNote(d))}</small>
        <div className="row-actions">
          <Button kind="secondary" icon={Eye} onClick={()=>open("leave-detail",d)}>{T("View")}</Button>
          {d.status==="Pending" && <Button kind="danger" icon={X} onClick={()=>cancel(d)}>{T("Cancel")}</Button>}
          {d.status==="Rejected" && <Button icon={RotateCcw} onClick={()=>{announce("Reapplying with previous details prefilled");open("apply-leave")}}>{T("Fix & reapply")}</Button>}
          {(d.status==="Cancelled"||d.status==="Expired") && <Button icon={RotateCcw} onClick={()=>{announce("Reapplying with previous details prefilled");open("apply-leave")}}>{T("Reapply")}</Button>}
        </div>
      </div>
    </div>)}</div>:<Empty icon={CalendarDays} title={T("No Leave Requests")} text={`You have no ${tab.toLowerCase()} leave requests.`}/>}</Card>
  </>;
}
function LeaveHolidaysPage({go}) {
const T=useT();
  return <>
    <PageTitle title={T("Leave & Holidays")} subtitle={T("Your leave balances, public holidays and team on leave.")}/>
    <LeaveTypeBalancesGrid/>
    <div className="detail-grid leave-detail-grid"><PublicHolidaysCard/><TeamOnLeaveCard go={go}/></div>
    <UpcomingTeamHolidaysCard/>
  </>;
}

// Employee self-service HRM request list — mirrors MyLeavesPage's card treatment.
function MyRequestsPage({open}) {
const T=useT();
  const [rows,setRows]=useState(MY_REQUESTS);
  const cancel=(rec)=>setRows(rows.map(r=>r.id===rec.id?{...r,status:"Cancelled",stage:"Done",progress:null,history:[...r.history,{label:"Cancelled",detail:"by Matilda Ipeh Anashie",time:"Just now",tone:"cancelled"}]}:r)) || announce(`${rec.type} cancelled`);
  return <>
    <PageTitle title={T("My Requests")} subtitle={T("Apply for time off, overtime, and more — all in one place")} actions={<Button icon={Plus} onClick={()=>open("new-request")}>{T("New Request")}</Button>}/>
    <Card>{rows.length?<div className="request-card-list">{rows.map(d=><div className="record-card" key={d.id}>
      <div className="record-card-head"><h3>{T(d.type)}</h3><Status>{d.status}</Status></div>
      <div className="record-card-submeta">
        <span>{T("Submitted")} {d.submitted}</span>
        <span>{d.manager!=="—"?d.manager:d.approvalChain}</span>
        {!!d.attachments && <span><FileText size={13}/>{d.attachments}{T(d.attachments>1?" files":" file")}</span>}
      </div>
      <div className="record-card-reason"><span>{T("Summary")}</span><p>{d.summary}</p></div>
      <div className="record-card-foot">
        <small>{T(statusFootNote(d))}</small>
        <div className="row-actions">
          <Button kind="secondary" icon={Eye} onClick={()=>open("request-detail",d)}>{T("View")}</Button>
          {d.status==="Pending" && <Button kind="danger" icon={X} onClick={()=>cancel(d)}>{T("Cancel")}</Button>}
          {d.status==="Rejected" && <Button icon={RotateCcw} onClick={()=>{announce("Reapplying with previous details prefilled");open("new-request")}}>{T("Fix & reapply")}</Button>}
          {(d.status==="Cancelled"||d.status==="Expired") && <Button icon={RotateCcw} onClick={()=>{announce("Reapplying with previous details prefilled");open("new-request")}}>{T("Reapply")}</Button>}
        </div>
      </div>
    </div>)}</div>:<Empty icon={ClipboardCheck} title={T("No Requests Yet")} text={T("Submit your first request using the button above.")}/>}</Card>
  </>;
}

// Team-lead approvals: awaiting-decision queue (with live Approve/Reject and full context) plus a
// decision-history tab, covering both leave and HRM requests reporting to the previewed lead.
function TeamApprovalsPage({open,role,path}) {
const T=useT();
  const [tab,setTab]=useState(path==="/decision-history"?"Decision history":"Awaiting decision");
  const [leaves,setLeaves]=useState(()=>LEAVE_REQUESTS.filter(d=>d.manager==="Matilda Ipeh Anashie"));
  const [requests,setRequests]=useState(()=>REQUESTS.filter(d=>d.manager==="Matilda Ipeh Anashie"));
  const [typeFilter,setTypeFilter]=useState("All types");
  const [sort,setSort]=useState("Newest first");
  const decide=(kind,rec,status)=>{
    const bump=(list,setList)=>setList(list.map(item=>item.id!==rec.id?item:{...item,status,stage:"Done",
      progress:item.progress?item.progress.map(s=>s.tone==="pending"?{...s,tone:status==="Approved"?"done":"rejected"}:s):item.progress,
      history:[...item.history,{label:status,detail:"by Matilda Ipeh Anashie",time:"Just now",tone:status==="Approved"?"done":"rejected"}]}));
    kind==="leave"?bump(leaves,setLeaves):bump(requests,setRequests);
    announce(`${rec.employee}'s ${rec.type} ${status.toLowerCase()} and added to decision history`);
  };
  const combined=[...leaves.map(d=>({...d,kind:"leave"})),...requests.map(d=>({...d,kind:"request"}))];
  const typeOptions=[...new Set(combined.map(d=>d.type))].sort();
  const visible=combined.filter(d=>tab==="Awaiting decision"?d.status==="Pending":d.status!=="Pending")
    .filter(d=>typeFilter==="All types"||d.type===typeFilter)
    .sort((a,b)=>{const diff=new Date(b.submitted)-new Date(a.submitted);return sort==="Newest first"?diff:-diff;});
  const pendingCount=combined.filter(d=>d.status==="Pending").length;
  return <>
    <PageTitle title={T("Approvals")} subtitle={T("Requests awaiting your decision and your decision history")}/>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"12px"}}>
      <div className="tabs pill-tabs">{["Awaiting decision","Decision history"].map(x=><button key={x} className={tab===x?"active":""} onClick={()=>setTab(x)}>{T(x)}{x==="Awaiting decision"&&<span>{pendingCount}</span>}</button>)}</div>
      <div className="toolbar" style={{margin:0}}>
        <Select className="select-compact" value={typeFilter} onChange={setTypeFilter}><option value="All types">{T("All types")}</option>{typeOptions.map(t=><option key={t}>{T(t)}</option>)}</Select>
        <Select className="select-compact" value={sort} onChange={setSort}><option value="Newest first">{T("Newest first")}</option><option value="Oldest first">{T("Oldest first")}</option></Select>
      </div>
    </div>
    <Card>{visible.length?<div className="leave-card-list">{visible.map(d=><div className="record-card" key={d.id}>
      <div className="record-card-head"><h3><Avatar initials={d.initials} small/>{d.employee}</h3><Status>{d.status}</Status></div>
      <div className="record-card-meta">
        <span>{d.team}{d.teamCode?` · ${d.teamCode}`:""}</span>
        <span className="meta-strong">{T(d.type)}</span>
        <span>{d.kind==="leave"?`${d.dates} · ${d.hours}`:d.summary}</span>
      </div>
      <div className="record-card-submeta">
        <span>{T("Submitted")} {d.submitted}</span>
        {d.kind==="leave" && d.overlap && <span className="detail-flag warn"><AlertTriangle size={12}/>{d.overlap}</span>}
        {!!d.attachments && <span><FileText size={13}/>{d.attachments}{T(d.attachments>1?" files":" file")}</span>}
      </div>
      <div className="record-card-reason"><span>{T("Reason")}</span><p>{d.kind==="leave"?d.reason:d.answers[0][1]}</p></div>
      <div className="record-card-foot">
        <small>{T(statusFootNote(d))}</small>
        <div className="row-actions">
          <Button kind="secondary" icon={Eye} onClick={()=>open(d.kind==="leave"?"leave-detail":"request-detail",d)}>{T("Review")}</Button>
          {d.status==="Pending" && <><IconButton icon={Check} label="Approve" success onClick={()=>decide(d.kind,d,"Approved")}/><IconButton icon={X} label="Reject" danger onClick={()=>decide(d.kind,d,"Rejected")}/></>}
        </div>
      </div>
    </div>)}</div>:<Empty icon={ClipboardCheck} title={tab===T("Awaiting decision")?T("Nothing waiting on you"):T("No decisions yet")} text={tab===T("Awaiting decision")?T("You're all caught up — new requests will appear here."):T("Approved and rejected requests will appear here.")}/>}</Card>
  </>;
}

function EmployeesPage({ go, open }) {
const T=useT();
  const directory=EMPLOYEE_DIRECTORY;
  const [q,setQ]=useState(""); const [status,setStatus]=useState("Active"); const [view,setView]=useState("grid");
  const [department,setDepartment]=useState("All Departments"); const [country,setCountry]=useState("All Countries"); const [team,setTeam]=useState("All Teams");
  const countries=[...new Set(directory.map(e=>countryFromMobile(e.mobile)))].sort();
  const teamNames=[...new Set(directory.map(e=>e.team))].sort();
  const list=directory.filter(e=>`${e.name} ${e.email} ${e.department} ${e.title}`.toLowerCase().includes(q.toLowerCase())
    && (department==="All Departments"||e.department===department)
    && (team==="All Teams"||e.team===team)
    && (country==="All Countries"||countryFromMobile(e.mobile)===country));
  const visible=status==="All"?list:list.filter(e=>(e.status||"Active")===status);
  const statuses=["Active","On PIP","On IDA","Inactive","Terminated","Resigned","Laid Off","All"];
  return <><PageTitle className="employee-title" title={T("Employee Directory")} subtitle={T(`Showing ${visible.length} of ${directory.length} employees`)} actions={<><Button kind="secondary" icon={Download}>{T("Export Excel")}</Button><Button icon={Plus} onClick={()=>open("employee")}>{T("Add Employee")}</Button></>}/><div className="employee-toolbar"><SearchBox placeholder={T("Search by name, email, or department…")} value={q} onChange={setQ}/><Select value={department} onChange={setDepartment}><option value="All Departments">{T("All Departments")}</option>{["AGN","BIC","BLK","CEO","FIN","HQ","HR","MNC","UNASSIGNED","VP"].map(x=><option key={x}>{x}</option>)}</Select><Select value={team} onChange={setTeam}><option value="All Teams">{T("All Teams")}</option>{teamNames.map(x=><option value={x} key={x}>{T(x)}</option>)}</Select><Select value={country} onChange={setCountry}><option value="All Countries">{T("All Countries")}</option>{countries.map(x=><option value={x} key={x}>{T(x)}</option>)}</Select><div className="view-switch"><button className={view==="grid"?"active":""} onClick={()=>setView("grid")}><LayoutDashboard size={15}/>{T("Grid")}</button><button className={view==="table"?"active":""} onClick={()=>setView("table")}><ListChecks size={15}/>{T("Table")}</button></div></div><div className="tabs-scroll"><div className="tabs pill-tabs">{statuses.map(x=><button key={x} className={status===x?"active":""} onClick={()=>setStatus(x)}>{T(x)}</button>)}</div></div>{!visible.length?<Card><Empty icon={Users} title={`No ${status.toLowerCase()} employees`} text={q?"No employee matches your search.":`Employees with ${status.toLowerCase()} status will appear here.`}/></Card>:view==="grid"?<div className="employee-card-grid">{visible.map((e,i)=><button className="employee-directory-card" key={e.name} onClick={()=>go(`/employees/${slugify(e.name)}`)}><div className="employee-card-person"><Avatar initials={e.initials}/><div><h3>{e.name}</h3><p>{T(e.title)}</p></div></div><Status>{e.status||"Active"}</Status><div className="employee-card-meta"><span><Building2 size={13}/>{e.department}</span><span><CalendarDays size={13}/>{e.joined}</span><strong>$ <b>{hourlyRate(e.name)}/hr</b></strong></div></button>)}</div>:<div className="employee-compact-table"><table><thead><tr>{[T("Employee"),T("Role"),T("Dept"),T("Joined"),T("Rate"),T("Status")].map(x=><th key={x}>{x}</th>)}</tr></thead><tbody>{visible.map(e=><tr key={e.name} onClick={()=>go(`/employees/${slugify(e.name)}`)}><td><span className="employee-cell"><Avatar initials={e.initials} small/><strong>{e.name}</strong></span></td><td>{T(e.title)}</td><td>{e.department}</td><td>{e.joined}</td><td className="rate-cell">${hourlyRate(e.name)}/hr</td><td><Status>{e.status||"Active"}</Status></td></tr>)}</tbody></table></div>}</>;
}

const employeeTabs = [["overview","Overview",Users],["documents","Documents",FileText],["education","Education",GraduationCap],["identity","ID & Passport",IdCard],["notes","HR Notes",NotebookPen],["pip","PIP",AlertTriangle],["ida","IDA",ShieldCheck],["salary","Salary",CircleDollarSign],["leaves","Leaves",CalendarDays],["hours","Working Hours",Clock3],["bank","Bank Details",WalletCards],["assets","Assets",Boxes],["history","Edit History",History]];
function slugify(name) { return name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""); }

function EmployeePage({ go, open, path }) {
const T=useT();
  const [tab,setTab]=useState("overview");
  const found = EMPLOYEE_DIRECTORY.find(e=>slugify(e.name)===(path||"").slice(11));
  const person = found ? {
    name: found.name, initials: found.initials, email: found.email, phone: found.mobile,
    title: found.title, department: found.department, team: found.team, manager: found.manager,
    joined: found.joined, dob: found.dob, status: found.status||"Active",
  } : {
    name: "Matilda Ipeh Anashie", initials: "MA", email: "matilda.anashie@must.company", phone: "+233 24 000 0000",
    title: "Senior Product Designer", department: "BLK", team: "BLK-UXI", manager: "Ismail Gorkem Kara",
    joined: "Mar 14, 2022", dob: "Jan 14, 1995", status: "Active",
  };
  const tabContent = {
    overview: <div className="detail-grid"><Card><h2>{T("Personal information")}</h2><Info rows={[["Work email",person.email],["Phone",person.phone],["Date of birth",person.dob]]}/></Card>{!found&&<Card><h2>{T("Emergency contact")}</h2><Info rows={[["Name","Elizabeth Anashie"],["Relationship","Sister"],["Phone","+233 20 000 0000"]]}/></Card>}</div>,
    documents: <RecordSection title="Documents" text="Contracts, certificates and other employee files" action="Upload Document" onAction={()=>open("document")} empty="No documents uploaded"/>,
    education: <RecordSection title="Education" text="Qualifications and education history" action="Add Qualification" onAction={()=>open("qualification")} rows={[["BSc. Communication Design","Kwame Nkrumah University","2013 – 2017","Verified"]]}/>,
    identity: <RecordSection title="ID & Passport" text="Identity documents and expiry details" action="Add Document" onAction={()=>open("identity")} rows={[["Ghana Card","GHA-000000000-0","Expires Jan 14, 2030","Active"]]}/>,
    notes: <RecordSection title="HR Notes" text="Private employee notes and records" action="Add HR Note" onAction={()=>open("note")} rows={[["General note","Career development discussion","Aug 8, 2026","Active"]]}/>,
    pip: <RecordSection title="Performance Improvement Plans" text="Track performance improvement activity" action="Start PIP" onAction={()=>open("pip")} empty="No PIP records"/>,
    ida: <RecordSection title="Internal Disciplinary Actions" text="Track disciplinary actions" action="Start IDA" onAction={()=>open("ida")} empty="No disciplinary actions"/>,
    salary: <RecordSection title="Salary Records" text="Compensation and deduction history" action="Add Salary Record" onAction={()=>open("salary")} rows={[["Aug 2026","$24,000","$3,840 deductions","$20,160 net"]]}/>,
    leaves: <LeaveBalances compact/>,
    hours: <WorkingHours/>,
    bank: <Card><div className="card-head"><div><h2><LockKeyhole size={18}/>{T("Bank Details")}</h2><p>{T("Payment account information")}</p></div><Button icon={Edit3} onClick={()=>open("bank")}>{T("Edit details")}</Button></div><Info rows={[["Account name",person.name],["Bank","Ecobank Ghana"],["Account number","•••• •••• 4912"],["SWIFT / BIC","ECOCGHAC"],["Status","Locked"]]}/></Card>,
    assets: <RecordSection title="Assigned Assets" text="Company property assigned to this employee" action="Assign Asset" onAction={()=>open("asset")} rows={[["MacBook Pro 14\"","MUST-LT-0142","Assigned Mar 14, 2024","Assigned"]]}/>,
    history: <RecordSection title="Edit History" text="Changes made to this employee record" rows={[["Job title updated","Senior Product Designer","Sneha Gupta","Aug 2, 2026"],["Bank details locked","Security policy","Arshman Afzal","Jul 17, 2026"]]}/>,
  };
  return <><button className="back-link" onClick={()=>go("/employees")}><ArrowLeft size={16}/>{T("Back to employees")}</button>
  <Card className="phero">
    <div className="phero-cover"/>
    <div className="phero-top">
      <span className="avatar-lg" style={avatarStyle(person.initials)}>{person.initials}</span>
      <div className="phero-id">
        <div className="phero-name-row"><h1>{person.name}</h1><Status>{person.status}</Status></div>
        <p className="phero-role">{T(person.title)}</p>
        <span className="phero-email">{person.email}</span>
      </div>
      <div className="phero-actions">
        <Button kind="secondary" icon={Edit3} onClick={()=>open("employee")}>{T("Edit")}</Button>
        <Button kind="secondary" icon={UserMinus} onClick={()=>open("terminate")}>{T("Terminate")}</Button>
        <Button kind="danger" icon={Trash2} onClick={()=>open("delete")}>{T("Delete")}</Button>
      </div>
    </div>
    <div className="phero-stats">
      <div className="pstat"><div className="k">{T("Department")}</div><div className="v">{person.department}</div></div>
      <div className="pstat"><div className="k">{T("Team")}</div><div className="v">{person.team}</div></div>
      <div className="pstat"><div className="k">{T("Reports to")}</div><div className="v">{person.manager}</div></div>
      <div className="pstat"><div className="k">{T("Start date")}</div><div className="v">{person.joined}</div></div>
    </div>
  </Card>
  <div className="tabs-scroll"><div className="tabs line-tabs">{employeeTabs.map(([id,label,Icon])=><button key={id} className={tab===id?"active":""} onClick={()=>setTab(id)}><Icon size={16}/>{T(label)}</button>)}</div></div>{tabContent[tab]}</>;
}

function Info({rows}) { const T=useT(); return <dl className="info-list">{rows.map(([a,b])=><div key={a}><dt>{T(a)}</dt><dd>{typeof b==="string"?T(b):b}</dd></div>)}</dl>; }
function RecordSection({title,text,action,onAction,rows,empty}) {const T=useT(); return <Card><div className="card-head"><div><h2>{T(title)}</h2><p>{T(text)}</p></div>{action&&<Button icon={Plus} onClick={onAction}>{T(action)}</Button>}</div>{rows ? <DataTable columns={[T("Record"),T("Details"),T("Date"),T("Status")]} rows={rows}/> : <Empty title={T(empty)} text={T("Records added here will appear in this section.")} action={action&&<Button icon={Plus} onClick={onAction}>{action}</Button>}/>}</Card>; }
function LeaveBalances({compact=false}) {const T=useT(); const rows=[["Annual Leave","15 days","7 days","8 days"],["Sick Leave","10 days","1 day","9 days"],["Compassionate Leave","5 days","0 days","5 days"]]; return <Card><div className="card-head"><div><h2>{T("Leave Balances")}</h2><p>{T("Current entitlement and usage")}</p></div></div><DataTable columns={[T("Leave type"),T("Allowance"),T("Used"),T("Remaining")]} rows={rows}/>{!compact&&<p className="helper">{T("Balances include approved requests for the 2026 leave year.")}</p>}</Card>; }
function WorkingHours(){const T=useT(); const [mode,setMode]=useState("Monthly"); return <Card><div className="card-head"><div><h2>{T("Working Hours")}</h2><p>{T("August 2026 attendance summary")}</p></div><div className="segmented"><button className={mode==="Monthly"?"active":""} onClick={()=>setMode("Monthly")}>{T("Monthly")}</button><button className={mode==="Daily"?"active":""} onClick={()=>setMode("Daily")}>{T("Daily")}</button></div></div>{mode==="Monthly"?<div className="hours-grid">{[[T("Days worked"),"8"],[T("Total hours"),"61h 24m"],[T("Average / day"),"7h 41m"],[T("Late arrivals"),"1"]].map(x=><div key={x[0]}><span>{x[0]}</span><strong>{x[1]}</strong></div>)}</div>:<DataTable columns={[T("Date"),T("Clock in"),T("Clock out"),T("Duration"),T("Status")]} rows={[["Aug 11, 2026","08:57","17:18","8h 21m","Completed"],["Aug 10, 2026","09:12","17:05","7h 53m","Completed"]]}/>}</Card> }

function TeamCard({team,go}) {const T=useT(); return <button className="live-team-card" onClick={()=>go(`/teams/${team.index}`)}><span className="team-topline"/><span className="live-team-icon"><Users size={22}/></span><ChevronRight className="team-arrow" size={17}/><h3>{T(team.name)}</h3><span className="team-code">{team.code}</span><span className="team-spacer"/><div className="team-card-foot"><div className="avatar-stack">{team.avatars.map((a,i)=><span key={`${a}-${i}`} className={a.startsWith("+")?"more":""} style={a.startsWith("+")?undefined:avatarStyle(a)}>{a}</span>)}</div><span className="member-count">{team.count} {team.count===1?T("member"):T("members")}</span>{team.leader!=="—"?<strong><Crown size={13}/>{team.leader}</strong>:<span className="no-leader">{T("No leader assigned")}</span>}</div></button> }

function TeamsPage({go,open}) {const T=useT(); const [q,setQ]=useState(""); const list=teams.filter(t=>`${t.name} ${t.code} ${t.leader}`.toLowerCase().includes(q.toLowerCase())); return <><PageTitle title={T("Teams")} subtitle={T(`${list.length} teams`)} actions={<Button icon={Plus} onClick={()=>open("team")}>{T("Create Team")}</Button>}/><div className="team-search"><SearchBox placeholder={T("Search by team name, description, leader, or member…")} value={q} onChange={setQ}/></div>{list.length?<div className="live-team-grid">{list.map(team=><TeamCard key={`${team.code}-${team.index}`} team={team} go={go}/>)}</div>:<Empty icon={Users} title={T("No teams found")} text={T("No team matches this search.")}/>}</> }

function MemberRow({name,initials,leader=false,reports,role}) {const T=useT(); return <div className="live-member-row"><Avatar initials={initials} small/><div className="member-copy"><div><strong>{name}</strong>{leader&&<span className="leader-badge"><Crown size={11}/>{T("Leader")}</span>}<Status>{T("Active")}</Status></div><p>{role||T("Team member")}</p></div><div className="reports-to"><span>{T("REPORTS TO")}</span><button onClick={()=>announce(`Reporting line editor opened for ${name}`)}>{reports||T("None")}<ChevronDown size={14}/></button></div><IconButton icon={UserMinus} label="Remove from team" onClick={()=>announce(`${name} removed from the team`)}/></div> }

function TeamDetail({go,open,path}) {const T=useT(); const idx=Number(path.split("/").pop()); const team=teams[Number.isFinite(idx)?idx:75]||teams[75]; const isUX=team.code==="BLK-UXI"; return <><button className="back-link live-back" onClick={()=>go("/teams")}><ArrowLeft size={16}/>{T("Back to Teams")}</button><Card className="team-detail-hero"><span className="team-detail-line"/><span className="live-team-icon large"><Users size={26}/></span><div className="team-detail-copy"><small>{team.code.split("-")[0]}</small><div><h1>{team.name}</h1><span className="team-code">{team.code}</span></div><p>{team.count} {team.count===1?T("member"):T("members")} {team.leader!=="—"?<strong><Crown size={14}/>{team.leader}</strong>:<span className="no-leader">{T("No leader assigned")}</span>}</p></div><div className="team-detail-actions"><Button kind="secondary" icon={Edit3} onClick={()=>open("team")}>{T("Edit")}</Button><Button kind="secondary" icon={Trash2} onClick={()=>open("team-delete")}>{T("Delete")}</Button></div></Card><Card className="team-members-card"><div className="card-head"><h2>{T("Team Members")}</h2><Button icon={UserPlus} onClick={()=>open("member")}>{T("Add Member")}</Button></div>{isUX?<><MemberRow name="Sneha Gupta" initials="SG" role="Product Designer · BLK" reports={team.leader!=="—"?team.leader:undefined}/><MemberRow name="Matilda Ipeh Anashie" initials="MI" leader role="Product Designer · BLK" reports="Lion Cho Chung Hyun"/></>:<>{team.avatars.filter(a=>!a.startsWith("+")).map((a,i)=>{const isLeader=i===0&&team.leader!=="—";return <MemberRow key={`${a}-${i}`} name={isLeader?team.leader:`Team member ${i+1}`} initials={a} leader={isLeader} role={`${team.code.split("-")[0]} team`} reports={!isLeader&&team.leader!=="—"?team.leader:undefined}/>})}</>}</Card></> }

// Parses this app's "Aug 17 – Aug 21, 2026" / single-day "Aug 12, 2026" date-range strings into
// real Date objects so the leave-date filter can compare against them; returns null if unparseable.
function parseLeaveDateRange(str) {
  const parts=str.split("–").map(s=>s.trim());
  const end=new Date(parts[parts.length-1]);
  if (isNaN(end)) return null;
  if (parts.length===1) return [end,end];
  const yearMatch=parts[1].match(/\d{4}/);
  const start=new Date(`${parts[0]}, ${yearMatch?yearMatch[0]:end.getFullYear()}`);
  return [isNaN(start)?end:start,end];
}
const LEAVE_STATUS_OPTIONS=["Pending","Approved","Rejected","Cancelled","Expired"];
function LeavesPage({open}) {
const T=useT();
  const [tab,setTab]=useState("Pending"); const [state,setState]=useState("Data"); const [allRows,setAllRows]=useState(LEAVE_REQUESTS);
  const [selected,setSelected]=useState(()=>new Set());
  const [q,setQ]=useState(""); const [typeFilter,setTypeFilter]=useState("All leave types");
  const [showFilters,setShowFilters]=useState(false);
  const [teamFilter,setTeamFilter]=useState("All teams"); const [statusFilter,setStatusFilter]=useState("All statuses");
  const [overlapOnly,setOverlapOnly]=useState(false); const [dateFrom,setDateFrom]=useState(""); const [dateTo,setDateTo]=useState("");
  const decide=(recs,status)=>{const ids=new Set(recs.map(r=>r.id));setAllRows(allRows.map(item=>!ids.has(item.id)?item:{...item,status,stage:"Done",
    progress:item.progress?item.progress.map(s=>s.tone==="pending"?{...s,tone:status==="Approved"?"done":"rejected"}:s):item.progress,
    history:[...item.history,{label:status,detail:"by Admin",time:"Just now",tone:status==="Approved"?"done":"rejected"}]}));
    announce(recs.length>1?`${recs.length} leave requests ${status.toLowerCase()} and added to decision history`:`${recs[0].employee}'s leave ${status.toLowerCase()} and added to decision history`);setSelected(new Set())};
  const leaveTypeOptions=[...new Set(LEAVE_REQUESTS.map(r=>r.type))];
  const teamOptions=[...new Set(LEAVE_REQUESTS.map(r=>r.team))];
  // The Pending/Completed/All Requests tabs already partition by status, so the Status filter must
  // stay within whatever the active tab allows — otherwise picking e.g. "Rejected" while on the
  // Pending tab is a dead combination that silently empties the table with no explanation.
  const statusFilterOptions=tab==="Completed"?LEAVE_STATUS_OPTIONS.filter(s=>s!=="Pending"):LEAVE_STATUS_OPTIONS;
  const changeTab=(x)=>{setTab(x);setSelected(new Set());setStatusFilter("All statuses")};
  const [dateLo,dateHi]=dateFrom&&dateTo&&dateFrom>dateTo?[dateTo,dateFrom]:[dateFrom,dateTo];
  let rows=allRows.filter(r=>{
    const range=parseLeaveDateRange(r.dates);
    return (tab==="All Requests" || (tab==="Completed" ? r.status!=="Pending" : r.status==="Pending")) &&
      (typeFilter==="All leave types"||r.type===typeFilter) &&
      (!q||r.employee.toLowerCase().includes(q.toLowerCase())) &&
      (teamFilter==="All teams"||r.team===teamFilter) &&
      (statusFilter==="All statuses"||r.status===statusFilter) &&
      (!overlapOnly||r.overlap) &&
      (!dateLo||!range||range[1]>=new Date(dateLo)) &&
      (!dateHi||!range||range[0]<=new Date(`${dateHi}T23:59:59`));
  });
  const pending=allRows.filter(r=>r.status==="Pending").length;
  const cells=rows.map(d=>[d.employee,d.team,d.type,d.dates,d.hours,d.overlap?"Overlap":d.attachments?`${d.attachments} file${d.attachments>1?"s":""}`:"—",d.status]);
  const toggleOne=(id)=>setSelected(prev=>{const next=new Set(prev);next.has(id)?next.delete(id):next.add(id);return next});
  const toggleAll=()=>setSelected(prev=>prev.size===rows.length?new Set():new Set(rows.map(r=>r.id)));
  const activeFilterCount=[teamFilter!=="All teams",statusFilter!=="All statuses",overlapOnly,!!dateFrom,!!dateTo].filter(Boolean).length;
  const clearFilters=()=>{setTypeFilter("All leave types");setTeamFilter("All teams");setStatusFilter("All statuses");setOverlapOnly(false);setDateFrom("");setDateTo("");setQ("")};
  return <><PageTitle className="leave-page-title" title={T("Leave Management")} subtitle={T("Review and manage employee leave requests")} actions={<><Button kind="secondary" icon={CalendarDays}>{T("Leave Sheet")}</Button><Button icon={Plus} onClick={()=>open("leave")}>{T("Apply for Employee")}</Button></>}/><div className="tabs-scroll"><div className="tabs pill-tabs">{["Pending","Completed","All Requests"].map(x=><button key={x} className={tab===x?"active":""} onClick={()=>changeTab(x)}>{T(x)}<span>{x==="Pending"?pending:x==="Completed"?allRows.length-pending:allRows.length}</span></button>)}</div></div><Card><Toolbar><SearchBox placeholder={T("Search employee")} value={q} onChange={setQ}/><Select value={typeFilter} onChange={setTypeFilter}><option value="All leave types">{T("All leave types")}</option>{leaveTypeOptions.map(t=><option value={t} key={t}>{T(t)}</option>)}</Select><Select value={state} onChange={setState}><option value="Data">{T("Data")}</option><option value="Empty">{T("Empty")}</option><option value="Loading error">{T("Loading error")}</option></Select><Button kind="secondary" icon={Filter} onClick={()=>setShowFilters(v=>!v)}>{T("Filters")}{activeFilterCount>0&&<b className="filters-count-badge">{activeFilterCount}</b>}</Button></Toolbar>{showFilters&&<div className="leave-filters-panel"><Select value={teamFilter} onChange={setTeamFilter}><option value="All teams">{T("All teams")}</option>{teamOptions.map(t=><option key={t}>{t}</option>)}</Select>{tab!=="Pending"&&<Select value={statusFilter} onChange={setStatusFilter}><option value="All statuses">{T("All statuses")}</option>{statusFilterOptions.map(s=><option key={s}>{s}</option>)}</Select>}<button type="button" className={`changes-only-toggle ${overlapOnly?"active":""}`} onClick={()=>setOverlapOnly(v=>!v)} title="Show only requests that overlap with another teammate's leave"><Check size={14}/>{T("Overlapping only")}</button><div className="activity-filter-field"><span>{T("Start date")}</span><input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)}/></div><div className="activity-filter-field"><span>{T("End date")}</span><input type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)}/></div><div className="activity-filter-field"><span>&nbsp;</span><button type="button" className="link filters-clear-link" onClick={clearFilters}>{T("Clear filters")}</button></div></div>}{tab==="Pending"&&selected.size>0&&<div className="bulk-action-bar"><strong>{selected.size}{T(" selected")}</strong><Button icon={Check} onClick={()=>decide(rows.filter(r=>selected.has(r.id)),"Approved")}>{T("Approve")}</Button><Button kind="danger" icon={X} onClick={()=>decide(rows.filter(r=>selected.has(r.id)),"Rejected")}>{T("Reject")}</Button><button className="bulk-clear" onClick={()=>setSelected(new Set())}>{T("Clear")}</button></div>}{state==="Loading error"?<ErrorState message="The leave request service returned an unexpected database response."/>:state==="Empty"||!rows.length?<Empty title={T("No leave requests")} text={state==="Empty"?`There are no ${tab.toLowerCase()} leave requests.`:"No leave requests match your search and filters."}/>:<DataTable columns={[T("Employee"),T("Team"),T("Leave type"),T("Dates"),T("Hours"),T("Flags"),T("Status")]} rows={cells} selectable={tab==="Pending"} selected={selected} onToggle={toggleOne} onToggleAll={toggleAll} getKey={(row,i)=>rows[i].id} renderActions={(r,i)=>{const rec=rows[i]; return <div className="row-actions"><IconButton icon={Eye} label="View request" onClick={()=>open("leave-detail",rec)}/>{rec.status==="Pending"&&<><IconButton icon={Check} label="Approve" success onClick={()=>decide([rec],"Approved")}/><IconButton icon={X} label="Reject" danger onClick={()=>decide([rec],"Rejected")}/></>}</div>}}/>}</Card></> }

function leaveSeed(str) { let h=0; for(let i=0;i<str.length;i++) h=(h*31+str.charCodeAt(i))>>>0; return h; }
function leaveBalanceCell(e, t) {
  const T=useT();
  const m=/(\d+)h/.exec(t.entitlement);
  if (!m) return <strong>{T("Unlimited")}</strong>;
  const total=parseInt(m[1],10);
  const seed=leaveSeed(e[0]+t.key);
  const used=Math.min(total,Math.round((total*(seed%101)/100)/4)*4);
  const pending=(seed%5===0)?Math.min(8,total-used):0;
  const balance=Math.max(0,total-used-pending);
  return <><strong>{balance}h left</strong><small>{used}h / {total}h used</small></>;
}
function LeaveBalancesPage({open}) {
const T=useT();
  return <><PageTitle title={T("Leave Balances")} subtitle={T("View and adjust employee leave balances")} actions={<Button kind="secondary" icon={Download}>{T("Export Balances")}</Button>}/><Card><Toolbar><SearchBox placeholder={T("Search employees")}/><Select><option value="All entities">{T("All entities")}</option><option>MUST Company Ghana</option></Select><Select><option>2026</option><option>2025</option></Select><Select><option value="All leave types">{T("All leave types")}</option>{LEAVE_TYPES.map(t=><option key={t.key}>{t.name}</option>)}</Select></Toolbar><div className="table-scroll responsive-table"><table className="leave-matrix"><thead><tr><th>{T("Employee")}</th><th>{T("Schedule")}</th>{LEAVE_TYPES.map(t=><th key={t.key}><span className={`leave-col-head ${t.tone}`}><i/>{t.name}</span></th>)}<th>{T("Actions")}</th></tr></thead><tbody>{employees.map(e=><tr key={e[0]}><td><span className="person-cell"><Avatar initials={e[5]} small/><span><strong>{e[0]}</strong><small>{T(e[1])}</small></span></span></td><td>{T("Mon–Fri")}</td>{LEAVE_TYPES.map(t=><td key={t.key}><div className="leave-balance-cell">{leaveBalanceCell(e,t)}</div></td>)}<td><IconButton icon={Edit3} label={`Edit ${e[0]}’s leave balance`} onClick={()=>open("balance")}/></td></tr>)}</tbody></table></div></Card></>;
}

function RequestsPage({open}) {
const T=useT();
  const [state,setState]=useState("Data");
  const cells=REQUESTS.map(d=>[d.employee,d.team,d.type,d.summary,d.submitted,d.status]);
  return <><PageTitle title={T("All Employee Services Requests")} subtitle={T("Track and manage employee requests")}/><Card><Toolbar><SearchBox placeholder={T("Search requests")}/><Select><option value="All request types">{T("All request types")}</option>{REQUEST_TYPES.map(t=><option key={t.key}>{t.name}</option>)}</Select><Select><option value="All statuses">{T("All statuses")}</option><option value="Pending">{T("Pending")}</option><option value="Approved">{T("Approved")}</option><option value="Rejected">{T("Rejected")}</option><option value="Cancelled">{T("Cancelled")}</option><option value="Expired">{T("Expired")}</option></Select><Select value={state} onChange={setState}><option value="Data">{T("Data")}</option><option value="Empty">{T("Empty")}</option><option value="Loading error">{T("Loading error")}</option></Select></Toolbar>{state==="Loading error"?<ErrorState message="Requests could not be loaded because the service response is incomplete."/>:state==="Empty"?<Empty title={T("No Employee Services requests")} text={T("No requests match the selected filters.")}/>:<DataTable columns={[T("Employee"),T("Team"),T("Request type"),T("Details"),T("Submitted"),T("Status")]} rows={cells} renderActions={(r,i)=> <IconButton icon={Eye} label="View request" onClick={()=>open("request-detail",REQUESTS[i])}/>} />}</Card></> }

function AssetsPage({open}) {
const T=useT();
  const [state,setState]=useState("Data");
  const [rows,setRows]=useState([["MacBook Pro 14\"","Laptop","MUST-LT-0142","Matilda Ipeh Anashie","Assigned"],["Dell Latitude 7440","Laptop","MUST-LT-0188","—","Available"],["iPhone 15 Pro","Mobile Phone","MUST-PH-0041","Ismail Gorkem Kara","Assigned"],["Samsung 27\" Monitor","Monitor","MUST-MN-0097","—","Available"]]);
  const toggleStatus=(i)=>setRows(rows.map((r,idx)=>{if(idx!==i)return r;const next=r[4]==="Assigned"?"Available":"Assigned";announce(`${r[0]} marked ${next}`);return [r[0],r[1],r[2],r[3],next];}));
  const deleteRow=(i)=>{announce(`${rows[i][0]} removed from asset inventory`);setRows(rows.filter((_,idx)=>idx!==i))};
  return <><PageTitle title={T("Assets")} subtitle={T("Manage company assets and assignments")} actions={<Button icon={PackagePlus} onClick={()=>open("asset")}>{T("Add Asset")}</Button>}/><Card><Toolbar><SearchBox placeholder={T("Search assets")}/><Select><option value="All asset types">{T("All asset types")}</option><option value="Laptop">{T("Laptop")}</option><option value="Mobile Phone">{T("Mobile Phone")}</option></Select><Select><option value="All statuses">{T("All statuses")}</option><option value="Available">{T("Available")}</option><option value="Assigned">{T("Assigned")}</option></Select><Select value={state} onChange={setState}><option value="Data">{T("Data")}</option><option value="Empty">{T("Empty")}</option><option value="Loading error">{T("Loading error")}</option></Select></Toolbar>{state==="Loading error"?<ErrorState message="Asset records could not be read because a required value is unavailable."/>:state==="Empty"||!rows.length?<Empty icon={Boxes} title={T("No assets found")} text={T("Try changing the filters or add a new asset.")}/>:<DataTable columns={[T("Asset"),T("Type"),T("Asset ID"),T("Assigned to"),T("Status")]} rows={rows} renderActions={(r,i)=> <div className="row-actions"><IconButton icon={Edit3} label="Edit" onClick={()=>open("asset")}/><MoreMenu actions={[[T("Reassign"),UserCog,()=>open("asset")],[r[4]==="Assigned"?T("Mark available"):T("Mark assigned"),RotateCcw,()=>toggleStatus(i)],[T("Delete asset"),Trash2,()=>deleteRow(i),true]]}/></div>}/>}</Card></>;
}

const DEPT_ORDER = ["CEO","VP","BLK","FIN","HQ","HR","MNC","AGN","BIC"];
function teamsByDept() { const map={}; teams.forEach(t=>{const d=t.code.split("-")[0]; (map[d]=map[d]||[]).push(t)}); return map; }

const ORG_HIERARCHY = {
  name:"Arshman Afzal", initials:"AA", title:"Chief Executive Officer", status:"Active",
  reports:[
    { name:"Sneha Gupta", initials:"SG", title:"People Operations Manager", status:"Active", reports:[
      { name:"Erwin Llanera", initials:"EL", title:"Recruitment Team Lead", status:"Active", reports:[
        { name:"Adaramoye Oluwaseun", initials:"AO", title:"Technical Recruiter", status:"Active", reports:[] },
        { name:"Adha Washington", initials:"AW", title:"Technical Recruiter", status:"Active", reports:[] },
      ] },
    ] },
    { name:"Ismail Gorkem Kara", initials:"IG", title:"Head of Product", status:"Active", reports:[
      { name:"Matilda Ipeh Anashie", initials:"MA", title:"Senior Product Designer", status:"Active", reports:[] },
      { name:"Ethan Walker", initials:"EW", title:"Product Design Team Lead", status:"Active", reports:[] },
    ] },
    { name:"Sharoon Raza", initials:"SR", title:"Director of Sales", status:"Active", reports:[
      { name:"Abdul Rehman", initials:"AR", title:"Recruitment Content-Team Leader", status:"On PIP", reports:[] },
    ] },
    { name:"Andre Ricardo", initials:"AR2", title:"Backend Engineer", status:"Inactive", reports:[] },
  ],
};
function collectHierarchyIds(node, id, set) { set.add(id); (node.reports||[]).forEach((child,i)=>collectHierarchyIds(child,`${id}/${i}`,set)); }
function countHierarchy(node) { return 1 + (node.reports||[]).reduce((sum,c)=>sum+countHierarchy(c),0); }
function hierarchyMatches(node, q) { if(!q) return true; if(node.name.toLowerCase().includes(q)||node.title.toLowerCase().includes(q)) return true; return (node.reports||[]).some(c=>hierarchyMatches(c,q)); }
function HierarchyNode({ node, id, openIds, toggle, q, isRoot }) {
const T=useT();
  const hasReports = node.reports && node.reports.length>0;
  const isOpen = openIds.has(id);
  const selfMatch = q && (node.name.toLowerCase().includes(q)||node.title.toLowerCase().includes(q));
  const branchMatches = hierarchyMatches(node,q);
  return <div className="hier-node">
    <div className={`hier-card ${isRoot?"is-root":""} ${selfMatch?"match":""} ${q&&!branchMatches?"dim":""}`}>
      <Avatar initials={node.initials}/>
      <div><strong>{node.name}</strong><span>{T(node.title)}</span></div>
      <Status>{node.status}</Status>
    </div>
    {hasReports && <button className="hier-toggle" onClick={()=>toggle(id)}><b>{node.reports.length}</b><ChevronDown size={12} style={{transform:isOpen?"rotate(180deg)":"none",transition:".2s"}}/></button>}
    {hasReports && isOpen && <div className="hier-children"><div className="hier-children-row">{node.reports.map((child,i)=><HierarchyNode key={i} node={child} id={`${id}/${i}`} openIds={openIds} toggle={toggle} q={q}/>)}</div></div>}
  </div>;
}
function OrgChart() {
const T=useT();
  const [zoom,setZoom]=useState(1);
  const [view,setView]=useState("Hierarchy");
  const [openDepts,setOpenDepts]=useState(()=>new Set(["AGN"]));
  const [openIds,setOpenIds]=useState(()=>{const s=new Set();collectHierarchyIds(ORG_HIERARCHY,"root",s);return s;});
  const [q,setQ]=useState("");
  const [deptFilter,setDeptFilter]=useState("All departments");
  const byDept = teamsByDept();
  const toggleDept = (d) => setOpenDepts(prev=>{const next=new Set(prev); next.has(d)?next.delete(d):next.add(d); return next;});
  const toggleNode = (id) => setOpenIds(prev=>{const next=new Set(prev); next.has(id)?next.delete(id):next.add(id); return next;});
  const depts = deptFilter==="All departments" ? DEPT_ORDER : [deptFilter];
  const isHierarchy = view==="Hierarchy";
  const collapseAll = () => isHierarchy ? setOpenIds(new Set()) : setOpenDepts(new Set());
  const expandAll = () => isHierarchy ? setOpenIds((()=>{const s=new Set();collectHierarchyIds(ORG_HIERARCHY,"root",s);return s;})()) : setOpenDepts(new Set(DEPT_ORDER));
  return <><PageTitle eyebrow="" title={T("Organization Chart")} subtitle={T(isHierarchy?`${countHierarchy(ORG_HIERARCHY)} people in the reporting line`:`9 departments · ${teams.length} teams`)}/>
    <div className="org-live-toolbar">
      <div className="view-switch org-view-switch"><button className={view==="Departments"?"active":""} onClick={()=>setView("Departments")}>{T("Departments")}</button><button className={view==="Hierarchy"?"active":""} onClick={()=>setView("Hierarchy")}>{T("Hierarchy")}</button></div>
      <SearchBox placeholder={isHierarchy?T("Jump to an employee…"):T("Search team or code…")} value={q} onChange={setQ}/>
      {!isHierarchy && <Select value={deptFilter} onChange={setDeptFilter}><option value="All departments">{T("All departments")}</option>{DEPT_ORDER.map(d=><option key={d}>{d}</option>)}</Select>}
      <Button kind="secondary" onClick={collapseAll}>{T("Collapse")}</Button><Button kind="secondary" onClick={expandAll}>{T("Expand all")}</Button>
      <div className="zoom"><IconButton icon={ZoomOut} label="Zoom out" onClick={()=>setZoom(Math.max(.6,zoom-.1))}/><span>{Math.round(zoom*100)}%</span><IconButton icon={ZoomIn} label="Zoom in" onClick={()=>setZoom(Math.min(1.4,zoom+.1))}/><IconButton icon={RotateCcw} label="Reset zoom" onClick={()=>setZoom(1)}/></div>
    </div>
    <div className="org-live-canvas">
      {isHierarchy
        ? <div className="hierarchy-tree" style={{zoom}}><HierarchyNode node={ORG_HIERARCHY} id="root" openIds={openIds} toggle={toggleNode} q={q.trim().toLowerCase()} isRoot/></div>
        : <div className="department-tree" style={{zoom}}>{depts.map(d=>{const deptTeams=(byDept[d]||[]).filter(t=>!q||`${t.name} ${t.code}`.toLowerCase().includes(q.toLowerCase())); const isOpen=openDepts.has(d); if(q&&!deptTeams.length) return null; return <div className="org-dept-block" key={d}><div className="department-card"><span className="department-icon"><Building2 size={20}/></span><div><small>{T("DEPARTMENT")}</small><h3>{d}</h3></div><MoreHorizontal size={16}/><b>{d}</b><span>{(byDept[d]||[]).length} team{(byDept[d]||[]).length===1?"":"s"}</span><button onClick={()=>toggleDept(d)}><ChevronDown size={14} style={{transform:isOpen?"rotate(180deg)":"none",transition:".2s"}}/></button></div>{isOpen&&<><div className="tree-connector"/><div className="team-tree-row">{deptTeams.map(t=><OrgTeam key={t.code} name={t.name} code={t.code} leader={t.leader} count={t.count}/>)}</div></>}</div>;})}</div>}
    </div>
  </>; }
function OrgTeam({name,code,leader,count}) {const T=useT(); return <div className="org-team-card"><div><strong>{T(name)}</strong><Users size={16}/></div><b>{code}</b><span>{leader&&leader!=="—"?leader:T("No leader")} <em>{count} {count===1?T("member"):T("members")}</em></span></div> }

const trendData = [241,246,245,253,256,264,269,275,281,287].map((value,index)=>({month:["Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"][index],value}));
const TENURE_BUCKETS=[["< 6 mo",26],["6–12 mo",97],["1–2 yr",64],["2–5 yr",97],["5+ yr",3]];
function WorkforceTrend(){const T=useT();return <div className="line-chart"><ResponsiveContainer width="100%" height="100%"><ReportLineChart data={trendData} margin={{top:8,right:12,left:-22,bottom:0}}><CartesianGrid stroke="#edf0ee" vertical={false}/><XAxis dataKey="month" axisLine={false} tickLine={false} tickFormatter={T} tick={{fontSize:10,fill:'#8f9290'}}/><YAxis domain={[230,300]} axisLine={false} tickLine={false} tick={{fontSize:10,fill:'#8f9290'}}/><Tooltip contentStyle={{fontSize:12,borderRadius:8,border:"1px solid #e5e8e6"}}/><Line dataKey="value" type="monotone" stroke="#018038" strokeWidth={3} dot={false} activeDot={{r:5}}/></ReportLineChart></ResponsiveContainer></div>}
function TenureChart(){const T=useT();return <div className="tenure-chart"><ResponsiveContainer width="100%" height="100%"><ReportBarChart data={TENURE_BUCKETS.map(([bucket,value])=>({bucket,value}))} margin={{top:8,right:4,left:-22,bottom:0}}><CartesianGrid stroke="#edf0ee" vertical={false}/><XAxis dataKey="bucket" axisLine={false} tickLine={false} tickFormatter={T} tick={{fontSize:10,fill:'#8f9290'}}/><YAxis axisLine={false} tickLine={false} tick={{fontSize:10,fill:'#8f9290'}}/><Tooltip cursor={{fill:"#f4f6f4"}} contentStyle={{fontSize:12,borderRadius:8,border:"1px solid #e5e8e6"}}/><Bar dataKey="value" fill="#018038" radius={[4,4,0,0]} maxBarSize={44}/></ReportBarChart></ResponsiveContainer></div>}
function ReportsPage() {
const T=useT();
  const departments=DEPARTMENTS;
  const onPip=EMPLOYEE_DIRECTORY.filter(e=>e.status==="On PIP");
  const departed=EMPLOYEE_DIRECTORY.filter(e=>["Resigned","Terminated","Laid Off"].includes(e.status));
  const totalHeadcount=departments.reduce((sum,[,value])=>sum+value,0);
  const leaveTypeUsage=[["Annual Leave",62],["Sick Leave",24],["WFH",41],["Casual Leave",18],["Unpaid Leave",3]];
  const maxLeaveDays=Math.max(...leaveTypeUsage.map(([,days])=>days));
  const summary=[
    [T("Total Employees"),totalHeadcount,"neutral",`Across ${departments.length} departments`],
    [T("Inactive"),0,"neutral",T("No inactive records")],
    ["On PIP",onPip.length,onPip.length?"amber":"neutral",onPip.length?T("Review needed"):T("All clear")],
    [T("Departures YTD"),departed.length,departed.length?"red":"neutral",departed.length?T("Resignations & terminations"):T("None recorded")],
  ];
  return <><PageTitle className="reports-page-title" title="Reports" subtitle={T("Comprehensive HR analytics and insights")} actions={<div className="report-downloads">{["Headcount","Leave","Salary","Tenure","Pip"].map(x=><Button key={x} kind="secondary" icon={Download}>{T(x)}</Button>)}</div>}/>
    <div className="metric-grid four">{summary.map(([label,value,tone,caption])=><Card className="metric" key={label}><span className="metric-label">{label}</span><strong className={`metric-value ${tone}`}>{value}</strong><small className={`metric-caption ${tone}`}>{T(caption)}</small></Card>)}</div>
    <div className="report-live-grid">
      <Card className="span-2 workforce-report"><div className="card-head"><h2><TrendingUp size={18}/>{T("Workforce Growth")}</h2><p>{T("Total headcount over the last 10 months")}</p></div><WorkforceTrend/></Card>
      <Card className="payroll-report"><div className="card-head"><h2>{T("Payroll Summary")}</h2></div><Empty icon={WalletCards} title={T("Payroll not connected")} text={T("Connect a payroll provider to see gross pay, deductions and net pay by department.")}/></Card>
      <Card className="department-report"><div className="card-head"><h2><BriefcaseBusiness size={18}/>{T("Headcount by Department")}</h2><button onClick={()=>announce("Headcount CSV export prepared")}><Download size={13}/>CSV</button></div>{departments.map(([name,value])=><div className="department-bar" key={name}><span>{name}<b>{value} ({value}A / 0I)</b></span><i><em style={{width:`${Math.max(8,value/84*100)}%`}}/></i></div>)}</Card>
      <Card className="employment-report"><div className="card-head"><h2><Users size={18}/>{T("Employment Type")}</h2></div><div className="employment-row"><strong>{totalHeadcount}</strong><div><b>{T("Full-time")}</b><span>{T("100% of workforce")}</span></div><i/></div><h3>{T("AVG HOURLY RATE BY DEPARTMENT")}</h3>{departments.map(([n])=><p key={n}>{n}<b>{n==="UNASSIGNED"?"$0/hr":"$25/hr"}</b></p>)}</Card>
      <Card className="leave-report"><div className="card-head"><div><h2><CalendarDays size={18}/>{T("Leave Report")}</h2><p>{T("Days taken by leave type, year to date")}</p></div><button onClick={()=>announce("Leave CSV export prepared")}><Download size={13}/>CSV</button></div>{leaveTypeUsage.map(([name,days])=><div className="department-bar" key={name}><span>{name}<b>{days} days</b></span><i><em style={{width:`${Math.max(8,days/maxLeaveDays*100)}%`}}/></i></div>)}</Card>
      <Card><div className="card-head"><h2><BriefcaseBusiness size={18}/>{T("Open Positions")}</h2><p>{T("Active requisitions across the company")}</p></div>{OPEN_POSITIONS.map(([role,dept,candidates])=><div className="mini-row" key={role}><span><strong>{role}</strong> · {dept}</span><span>{candidates}</span></div>)}</Card>
      <Card><div className="card-head"><h2><UserMinus size={18}/>{T("Departures")}</h2><p>{T("Resignations, terminations and layoffs this year")}</p></div>{departed.length?<div className="people-list">{departed.map(e=><div className="person-row" key={e.name}><Avatar initials={e.initials} small/><div><strong>{e.name}</strong><span>{T(e.title)}</span></div><time>{e.separationDate}<small>{e.status}</small></time></div>)}</div>:<Empty icon={UserMinus} title="0" text={T("No departures recorded")}/>}</Card>
      <Card><div className="card-head"><h2>{T("PIP Report")}</h2></div>{onPip.length?<div className="people-list">{onPip.map(e=><div className="person-row" key={e.name}><Avatar initials={e.initials} small/><div><strong>{e.name}</strong><span>{T(e.title)}</span></div></div>)}</div>:<Empty icon={AlertTriangle} title="0" text={T("No active PIPs")}/>}</Card>
      <Card><div className="card-head"><h2><ShieldCheck size={18}/>{T("Document Compliance")}</h2></div><Empty icon={ShieldCheck} title={T("Not tracked yet")} text={T("Connect e-signature status to see contract completion by employee here.")}/></Card>
      <Card><div className="card-head"><h2><BarChart3 size={18}/>{T("Saved Reports")}</h2></div>{[[T("Headcount by department"),"Headcount CSV export prepared"],[T("Leave utilization"),"Leave CSV export prepared"],[T("Payroll summary"),"Payroll CSV export prepared"],[T("Members on PIP"),"PIP CSV export prepared"]].map(([label,msg])=><div className="mini-row" key={label}><span><strong>{label}</strong></span><button onClick={()=>announce(msg)}>{T("Run")} →</button></div>)}</Card>
      <Card className="span-2"><div className="card-head"><h2>{T("Tenure Analysis")}</h2><p>{T("Distribution of employees by time in company")}</p></div><div className="tenure-head"><strong>19 mo</strong><span>{T("Average Tenure")}</span></div><TenureChart/><h3 className="tenure-longest-head">{T("LONGEST TENURED")}</h3><div className="people-list">{LONGEST_TENURED.map(([name,dept,years])=><div className="person-row" key={name}><Avatar initials={name.split(" ").slice(0,2).map(w=>w[0]).join("")} small/><div><strong>{name}</strong><span>{dept}</span></div><span className="tenure-longest-tag">{years}</span></div>)}</div></Card>
    </div>
  </> }

function AnnouncementsPage({open}) {
const T=useT();
  return <><PageTitle title="Announcements" subtitle={T("Broadcast updates to the whole company or specific teams.")} actions={<Button icon={Megaphone} onClick={()=>open("announcement")}>{T("New Announcement")}</Button>}/>
    <Card><div className="card-head"><h2>{T("All announcements")}</h2></div><div className="people-list">{ANNOUNCEMENTS.map(([title,audience,by,when,status])=><div className="person-row" key={title}><span className="team-icon"><Megaphone size={18}/></span><div><strong>{T(title)}</strong><span>{T(audience)} · {T("posted by")} {by}</span></div><time>{T(when)}<small>{T(status)}</small></time></div>)}</div></Card>
  </> }
function DocumentsPage({open,go}) {
const T=useT();
  return <><PageTitle className="docs-page-title" title={T("Documents & Templates")} subtitle={T("Company templates and org-wide document management.")} actions={<Button kind="secondary" icon={Upload} onClick={()=>open("document")}>{T("Upload")}</Button>}/>
    <div className="doc-template-grid">{DOCUMENT_TEMPLATES.map(([name,desc,bg,fg])=><button className="card doc-template-card" key={name} onClick={()=>go(`/documents/${slugify(name)}`)}><span className="doc-template-icon" style={{background:bg,color:fg}}><FileText size={20}/></span><h3>{T(name)}</h3><p>{T(desc)}</p><span className="doc-template-link">{T("Template · edit →")}</span></button>)}</div>
    <Card><div className="card-head"><h2>{T("Company documents")}</h2></div><div className="people-list">{COMPANY_DOCUMENTS.map(([name,meta,status])=><button className="person-row" key={name} onClick={()=>go(`/documents/${slugify(name)}`)}><span className="team-icon"><FileText size={18}/></span><div><strong>{T(name)}</strong><span>{T(meta)}</span></div><Status>{status}</Status></button>)}</div></Card>
  </> }
function DocumentDetail({go,path}) {
const T=useT();
  const slug=(path||"").slice(11);
  const tpl=DOCUMENT_TEMPLATES.find(([n])=>slugify(n)===slug);
  const doc=COMPANY_DOCUMENTS.find(([n])=>slugify(n)===slug);
  if(!tpl&&!doc) return <><button className="back-link" onClick={()=>go("/documents")}><ArrowLeft size={16}/>{T("Back to Documents")}</button><Empty icon={FileText} title="Document not found" text="This document or template doesn't exist."/></>;
  const name=tpl?tpl[0]:doc[0]; const desc=tpl?tpl[1]:doc[1]; const status=doc?doc[2]:null; const fg=tpl?tpl[3]:"#018038";
  return <><button className="back-link" onClick={()=>go("/documents")}><ArrowLeft size={16}/>{T("Back to Documents")}</button>
    <Card className="team-detail-hero"><span className="team-detail-line"/><span className="live-team-icon large" style={{background:`linear-gradient(135deg,${fg},#111)`}}><FileText size={26}/></span><div className="team-detail-copy"><small>{tpl?T("TEMPLATE"):T("COMPANY DOCUMENT")}</small><div><h1>{name}</h1>{status&&<span className="team-code">{status}</span>}</div><p>{desc}</p></div><div className="team-detail-actions"><Button kind="secondary" icon={Download} onClick={()=>announce(`${name} downloaded`)}>{T("Download")}</Button>{tpl&&<Button kind="secondary" icon={Edit3} onClick={()=>announce(`${name} template editor opened`)}>{T("Edit Template")}</Button>}</div></Card>
    <Card><div className="card-head"><h2>{T("Details")}</h2></div><Info rows={tpl?[["Type","Template"],["Used for",desc],["Last updated","May 7, 2026"],["Owner","HR Operations"]]:[["Type","Company document"],["Description",desc],["Status",status],["Last updated","May 7, 2026"]]}/></Card>
  </> }
function FeedbacksPage({open}) {
  const T=useT();
  const [rows,setRows]=useState([["H1 2026 Performance Review","Jan 15 – Jun 30, 2026","All employees","Completed"],["Q3 Leadership Feedback","Jul 1 – Sep 30, 2026","Team leads","Active"],["Probation Review","Ongoing","New employees","Active"]]);
  const duplicate=(i)=>{const r=rows[i];setRows([...rows,[`${r[0]} (copy)`,r[1],r[2],"Active"]]);announce(`${r[0]} duplicated`)};
  const archive=(i)=>{announce(`${rows[i][0]} archived`);setRows(rows.filter((_,idx)=>idx!==i))};
  return <><PageTitle title="Feedback Cycles" subtitle={T("Create and manage employee feedback cycles")} actions={<Button icon={Plus} onClick={()=>open("feedback-cycle")}>{T("Create Cycle")}</Button>}/><div className="metric-grid three">{[[T("Active cycles"),"2"],[T("Open responses"),"94"],[T("Completion rate"),"76%"]].map(x=><Card className="simple-metric" key={x[0]}><span>{x[0]}</span><strong>{x[1]}</strong></Card>)}</div><Card><Toolbar><SearchBox placeholder={T("Search cycles")}/><Select><option value="All statuses">{T("All statuses")}</option><option value="Active">{T("Active")}</option><option value="Completed">{T("Completed")}</option></Select></Toolbar><DataTable columns={[T("Cycle"),T("Period"),T("Audience"),T("Status")]} rows={rows} renderActions={(r,i)=> <div className="row-actions"><IconButton icon={Eye} label="View" onClick={()=>open("feedback-cycle",r)}/><MoreMenu actions={[[T("Edit cycle"),Edit3,()=>open("feedback-cycle",r)],[T("Duplicate"),Copy,()=>duplicate(i)],[T("Archive"),Archive,()=>archive(i),true]]}/></div>}/></Card></>;
}

const SETTINGS_TABS = [
  ["Departments", "/settings/departments"],
  ["Company Entities", "/settings/company-entities"],
  ["Leave Types", "/settings/leave-types"],
  ["Request Types", "/settings/request-types"],
  ["Feedback Forms", "/settings/feedback-forms"],
  ["Users & Roles", "/settings/users"],
  ["Activity Logs", "/activity-logs"],
  ["Platform Settings", "/settings/platform"],
];
function SettingsShell({path, go, children, role}) {
const T=useT();
  const active = path==="/settings" ? "/settings/departments" : path;
  return <><div className="tabs-scroll"><div className="tabs line-tabs settings-tabs">{SETTINGS_TABS.map(([label,to])=>{const locked=to==="/settings/platform"&&role!=="Super Admin"; return <button key={to} className={active===to?"active":""} disabled={locked} title={locked?T("Super Admin only"):undefined} onClick={()=>!locked&&go(to)}>{T(label)}{locked&&<LockKeyhole size={11}/>}</button>})}</div></div>{children}</>;
}
function SettingsList({kind,open}) {
const T=useT();
  const [departmentItems,setDepartmentItems]=useState(()=>["AGN","BIC","BLK","CEO","FIN","HQ","HR","MNC","VP"].map(c=>({name:c,code:c})));
  const [entityItems,setEntityItems]=useState(["MUST Company PK","MUST Engage","MUST U"]);
  const [newName,setNewName]=useState(""); const [newCode,setNewCode]=useState(""); const [confirming,setConfirming]=useState("");
  if(kind==="requestTypes") return <><PageTitle title={T("Request Types")} subtitle={T("Define Employee Services request forms and their approval workflows")} actions={<Button icon={Plus} onClick={()=>open("request-type")}>{T("Add Request Type")}</Button>}/><Card className="live-empty-card"><Empty icon={ListChecks} title={T("No Request Types")} text={T("Create your first request type (e.g. Overtime, Shift Adjustment).")}/></Card></>;
  if(kind==="feedbackForms") return <><PageTitle title={T("Feedback Forms")} subtitle={T("Create and manage feedback form templates used in cycles")} actions={<Button icon={Plus} onClick={()=>open("feedback-form")}>{T("New form")}</Button>}/><Card className="feedback-form-row"><div><h3>{T("Next Level Growth – Monthly 360° Reflection")} <span>{T("System")}</span></h3><p>{T("Monthly 360° reflection covering collaboration, communication, growth, problem-solving, and ownership.")}</p><small>5 steps · 25 questions · updated May 7, 2026</small></div><div><IconButton icon={Edit3} label="Edit" onClick={()=>open("feedback-form")}/><IconButton icon={Copy} label={T("Duplicate")} onClick={()=>announce("Feedback form duplicated")}/></div></Card></>;
  if(kind==="leaveTypes") return <><PageTitle title={T("Leave Types")} subtitle="Configure the types of leave employees can apply for — mirrors what employees see in Apply for Leave" actions={<Button icon={Plus} onClick={()=>open("leave-type")}>{T("Add Leave Type")}</Button>}/><div className="leave-type-list">{LEAVE_TYPES.map(t=><Card className="leave-type-row" key={t.key}><span className={t.tone}><CalendarDays size={20}/></span><div><h3>{T(t.name)} <b>{T(t.entitlement)} · {T(t.unit)}</b><em className={t.paid?"":"unpaid"}>{t.paid?T("Paid"):T("Unpaid")}</em></h3><p>{T(t.policy)}</p></div><div className="row-actions"><IconButton icon={Archive} label={`Deactivate ${t.name}`} onClick={()=>announce(`${t.name} deactivated`)}/><IconButton icon={Edit3} label="Edit" onClick={()=>open("leave-type")}/><IconButton icon={Trash2} label="Delete" className="danger-hover" onClick={()=>open("delete")}/></div></Card>)}</div></>;
  const isDept=kind==="departments"; const title=isDept?"Departments":"Company Entities"; const sub=isDept?"The top of the org hierarchy — Department → Team → Team Code.":"The legal/brand entities employees belong to (e.g. MUST Company PK, MUST U, MUST Engage)."; const items=isDept?departmentItems:entityItems;
  const addItem=()=>{
    if(isDept){ const code=newCode.trim().toUpperCase(); if(!code){announce("Enter a department code","error");return} if(items.some(d=>d.code===code)){announce("This record already exists","error");return} setDepartmentItems([...items,{name:newName.trim()||code,code}]); }
    else { const name=newName.trim(); if(!name){announce("Enter a company entity","error");return} if(items.some(x=>x.toLowerCase()===name.toLowerCase())){announce("This record already exists","error");return} setEntityItems([...items,name]); }
    setNewName("");setNewCode("");announce(`${isDept?"Department":"Company entity"} added`);
  };
  const removeItem=(key)=>{ if(isDept)setDepartmentItems(items.filter(d=>d.code!==key)); else setEntityItems(items.filter(x=>x!==key)); setConfirming("");announce(`${key} deleted and recorded in Activity Logs`); };
  return <><PageTitle title={title} subtitle={sub}/><div className="settings-layout"><Card className="settings-create"><h2>{T(isDept?"Add Department":"Add Company Entity")}</h2><div className={isDept?"department-create":"entity-create"}>{isDept?<><Field label="Department Title"><input value={newName} onChange={e=>setNewName(e.target.value)} placeholder={T("e.g. Human Resource")}/></Field><Field label="Department Code"><input value={newCode} onChange={e=>setNewCode(e.target.value)} placeholder={T("e.g. HR")}/></Field><Button icon={Plus} onClick={addItem}>{T("Add Department")}</Button></>:<><Field label="New Company Entity"><input value={newName} onChange={e=>setNewName(e.target.value)} placeholder={T("e.g. MUST Engage")}/></Field><Button icon={Plus} onClick={addItem}>{T("Add")}</Button></>}</div></Card><Card className="settings-rows">{items.map(item=>{const key=isDept?item.code:item; const name=isDept?item.name:item; const code=isDept?item.code:null; return <React.Fragment key={key}><div className="settings-row"><span><Building2 size={17}/></span><strong>{name}</strong>{code&&code!==name&&<b>{code}</b>}<IconButton icon={Edit3} label={isDept?"Edit":"Rename"} onClick={()=>open(isDept?"department":"entity")}/><IconButton icon={Trash2} label="Delete" className="danger-hover" onClick={()=>setConfirming(key)}/></div>{confirming===key&&<div className="settings-confirm"><AlertTriangle size={18}/><div><strong>Delete {name}?</strong><p>{isDept?"Teams and employees using this department must be reassigned first.":"Employees linked to this entity must be reassigned first."}</p></div><Button kind="secondary" onClick={()=>setConfirming("")}>{T("Cancel")}</Button><Button kind="danger" onClick={()=>removeItem(key)}>Delete</Button></div>}</React.Fragment>})}</Card></div></>;
}

function UsersPage({open}) {
const T=useT();
  const [tab,setTab]=useState("Users"); const [filter,setFilter]=useState("Active"); const [q,setQ]=useState("");
  const [rows,setRows]=useState([
    {ini:"SA",name:"Super Admin",email:"admin@must.company",role:"Super Admin",team:"BIC",lastActive:"Active 2m ago",status:"Active"},
    {ini:"RL",name:"Ri Le Tan",email:"ritan@must.company",role:"Employee",team:"BLK",lastActive:"Active 1h ago",status:"Active"},
    {ini:"AJ",name:"Afroas Jameela",email:"roazy@must.company",role:"Employee",team:"HR",lastActive:"Active yesterday",status:"Active"},
    {ini:"AA",name:"Ateeq Ahmed",email:"u.arham@must.company",role:"Employee",team:"HR",lastActive:"Active 3d ago",status:"Active"},
    {ini:"EL",name:"Erwin Llanera",email:"l.erwin@must.company",role:"Employee",team:"HR",lastActive:"Active 1w ago",status:"Active"},
    {ini:"IG",name:"Ismail Gorkem Kara",email:"k.ismail@must.company",role:"Employee",team:"BLK",lastActive:"Never signed in",status:"Active"},
    {ini:"AR",name:"Andre Ricardo",email:"a.ricardo@must.company",role:"Employee",team:"Platform",lastActive:"Blocked 2w ago",status:"Blocked"},
  ]);
  const [selected,setSelected]=useState(()=>new Set());
  const [roleFilter,setRoleFilter]=useState("All Roles");
  const [confirmBlock,setConfirmBlock]=useState(null);
  const roles=[["Admin","Administrative access; cannot manage users or roles",24,0,"admin","purple"],["Employee","Self-service access only — applies to leave, feedback, profile",0,283,"employee","gray"],["Super Admin","Full access to every feature in the system",44,5,"super_admin","dark"]];
  const visible=rows.filter(r=>(filter==="All"||r.status===filter)&&(roleFilter==="All Roles"||r.role===roleFilter)&&`${r.name} ${r.email} ${r.role}`.toLowerCase().includes(q.toLowerCase()));
  const filterCounts={Active:rows.filter(r=>r.status==="Active").length,Blocked:rows.filter(r=>r.status==="Blocked").length,All:rows.length};
  const roleCounts={"All Roles":rows.length,Employee:rows.filter(r=>r.role==="Employee").length,Admin:rows.filter(r=>r.role==="Admin").length,"Super Admin":rows.filter(r=>r.role==="Super Admin").length};
  const changeRole=(email,role)=>{setRows(rows.map(r=>r.email===email?{...r,role}:r));announce(`${email} moved to ${role}`)};
  const toggleOne=(email)=>setSelected(prev=>{const next=new Set(prev);next.has(email)?next.delete(email):next.add(email);return next});
  const toggleAll=()=>setSelected(prev=>prev.size===visible.length?new Set():new Set(visible.map(r=>r.email)));
  const bulkRole=(role)=>{setRows(rows.map(r=>selected.has(r.email)?{...r,role}:r));announce(`${selected.size} user${selected.size>1?"s":""} moved to ${role}`);setSelected(new Set())};
  const setStatus=(emails,status)=>{setRows(rows.map(r=>emails.includes(r.email)?{...r,status,lastActive:status==="Blocked"?"Blocked just now":r.lastActive}:r));announce(`${emails.length>1?`${emails.length} users`:emails[0]} ${status==="Blocked"?"blocked — they can no longer sign in":"restored — they can sign in again"}`)};
  const selectedAllBlocked=selected.size>0&&[...selected].every(email=>rows.find(r=>r.email===email)?.status==="Blocked");
  return <><PageTitle title={T("User & Role Management")} subtitle={T("Manage user accounts, create custom roles, and control granular permissions")} actions={<Button icon={tab==="Users"?UserPlus:Plus} onClick={()=>open(tab==="Users"?"user":"role")}>{tab==="Users"?T("Create User"):T("Create Role")}</Button>}/><div className="tabs pill-tabs live-user-tabs"><button className={tab==="Users"?"active":""} onClick={()=>setTab("Users")}>{T("Users")} (288)</button><button className={tab==="Roles"?"active":""} onClick={()=>setTab("Roles")}>{T("Roles & Permissions")} (3)</button></div>{tab==="Users"?<><div className="user-filters"><SearchBox placeholder={T("Search by name, email, or role…")} value={q} onChange={setQ}/><FilterMenu value={filter} options={["Active","Blocked","All"]} counts={filterCounts} onChange={x=>{setFilter(x);setSelected(new Set())}}/><FilterMenu value={roleFilter} options={["All Roles","Employee","Admin","Super Admin"]} counts={roleCounts} onChange={setRoleFilter}/></div>{selected.size>0&&<div className="bulk-action-bar"><strong>{selected.size}{T(" selected")}</strong><Button kind="secondary" onClick={()=>bulkRole("Admin")}>{T("Set as Admin")}</Button><Button kind="secondary" onClick={()=>bulkRole("Employee")}>{T("Set as Employee")}</Button>{selectedAllBlocked?<Button icon={UserCheck} onClick={()=>{setStatus([...selected],"Active");setSelected(new Set())}}>{T("Restore access")}</Button>:<Button kind="danger" icon={UserMinus} onClick={()=>{setStatus([...selected],"Blocked");setSelected(new Set())}}>{T("Block access")}</Button>}<button className="bulk-clear" onClick={()=>setSelected(new Set())}>{T("Clear")}</button></div>}{visible.length?<><ScrollFadeTable className="user-live-table table-scroll responsive-table"><table><thead><tr><th className="checkbox-cell"><input type="checkbox" checked={selected.size>0&&selected.size===visible.length} onChange={toggleAll} aria-label="Select all users"/></th>{[T("User"),T("Role"),T("Team"),T("Last Active"),T("Actions")].map(x=><th key={x}>{x}</th>)}</tr></thead><tbody>{visible.map(r=><React.Fragment key={r.email}><tr><td className="checkbox-cell" data-label=""><input type="checkbox" checked={selected.has(r.email)} onChange={()=>toggleOne(r.email)} aria-label={`Select ${r.name}`}/></td><td data-label="User"><span className="person-cell"><Avatar initials={r.ini} small/><span><strong>{r.name}</strong><small>{r.email}</small>{r.status==="Blocked"&&<em className="blocked-tag">{T("Blocked")}</em>}</span></span></td><td data-label="Role"><label className={`role-select ${r.role==="Super Admin"?"super":""}`}><select value={r.role} onChange={e=>changeRole(r.email,e.target.value)} aria-label={`Role for ${r.name}`}><option value="Employee">{T("Employee")}</option><option value="Admin">{T("Admin")}</option><option value="Super Admin">{T("Super Admin")}</option></select><ChevronDown size={12}/></label></td><td data-label="Team">{r.team}</td><td data-label="Last Active">{T(r.lastActive)}</td><td data-label="Actions"><div className="row-actions"><Button kind="secondary" icon={LockKeyhole} onClick={()=>announce(`Password reset instructions sent to ${r.email}`)}>{T("Reset")}</Button>{r.status==="Active"?<Button kind="danger" icon={UserMinus} onClick={()=>setConfirmBlock(r.email)}>{T("Block")}</Button>:<Button kind="secondary" icon={UserCheck} onClick={()=>setStatus([r.email],"Active")}>{T("Restore")}</Button>}</div></td></tr>{confirmBlock===r.email&&<tr className="confirm-row"><td colSpan={6}><div className="settings-confirm"><AlertTriangle size={18}/><div><strong>Block {r.name}'s access?</strong><p>{T("They won't be able to sign in until you restore access. Their employee record and history are kept.")}</p></div><Button kind="secondary" onClick={()=>setConfirmBlock(null)}>{T("Cancel")}</Button><Button kind="danger" onClick={()=>{setStatus([r.email],"Blocked");setConfirmBlock(null)}}>{T("Block access")}</Button></div></td></tr>}</React.Fragment>)}</tbody></table></ScrollFadeTable><p className="users-footer-note">{T(`Showing ${visible.length} of 288 total users`)}</p></>:<Card><Empty icon={UserMinus} title={filter==="Blocked"?T("No blocked users"):T("No users found")} text={filter==="Blocked"?T("Blocked accounts will appear here."):T("Try a different name, email, or role.")}/></Card>}</>:<div className="role-card-grid">{roles.map(([name,desc,permissions,users,key,tone])=><Card className={`role-card ${tone}`} key={name}><h3>{name} <span><LockKeyhole size={10}/>System</span></h3><p>{desc}</p><div><span>{T("PERMISSIONS")}<strong>{permissions}</strong></span><span>{T("USERS")}<strong>{users}</strong></span><span>KEY<code>{key}</code></span></div><button onClick={()=>open("role")}>{T("Manage Permissions →")}</button></Card>)}</div>}</>;
}

const ACTIVITY_ACTIONS=["All","Created","Updated","Approved","Rejected","Deleted","Viewed","Logged in"];
const MUTATING_ACTIONS=["Created","Updated","Deleted","Approved","Rejected"];
function ActivityLogsPage() {
const T=useT();
  const [detail,setDetail]=useState(null); const [action,setAction]=useState("All"); const [moreFilters,setMoreFilters]=useState(false);
  const [actor,setActor]=useState("Anyone"); const [recordType,setRecordType]=useState("All records"); const [changesOnly,setChangesOnly]=useState(false);
  const [dateFrom,setDateFrom]=useState(""); const [dateTo,setDateTo]=useState("");
  const rows=ACTIVITY_LOG;
  const actors=["Anyone",...new Set(rows.map(r=>r[2]))];
  const recordTypes=["All records",...new Set(rows.map(r=>r[5]).filter(v=>v!=="—"))];
  const visible=rows.filter(r=>
    (action==="All"||r[3]===action) &&
    (actor==="Anyone"||r[2]===actor) &&
    (recordType==="All records"||r[5]===recordType) &&
    (!changesOnly||MUTATING_ACTIONS.includes(r[3])) &&
    (!dateFrom||new Date(r[0])>=new Date(dateFrom)) &&
    (!dateTo||new Date(r[0])<=new Date(`${dateTo}T23:59:59`))
  );
  const actionCounts=Object.fromEntries(ACTIVITY_ACTIONS.map(a=>[a,a==="All"?rows.length:rows.filter(r=>r[3]===a).length]));
  const activeFilterCount=[actor!=="Anyone",recordType!=="All records",changesOnly,!!dateFrom,!!dateTo].filter(Boolean).length;
  return <><PageTitle title={T("Activity Logs")} subtitle={T("Every action across the system — who did what, to whom, and when.")}/><div className="activity-filters"><div className="activity-filters-row"><SearchBox placeholder={T("Search by person, action, or resource…")}/><FilterMenu value={action} options={ACTIVITY_ACTIONS} counts={actionCounts} onChange={setAction}/><button className={`filters-toggle ${moreFilters?"active":""}`} onClick={()=>setMoreFilters(v=>!v)}><SlidersHorizontal size={15}/>{T("More filters")}{activeFilterCount>0&&<b>{activeFilterCount}</b>}</button></div><div className={`activity-filters-row activity-filters-secondary ${moreFilters?"open":""}`}>
    <div className="activity-filter-field"><span>{T("Actor")}</span><Select value={actor} onChange={setActor}>{actors.map(a=><option value={a} key={a}>{T(a)}</option>)}</Select></div>
    <div className="activity-filter-field"><span>{T("Record type")}</span><Select value={recordType} onChange={setRecordType}>{recordTypes.map(r=><option value={r} key={r}>{T(r)}</option>)}</Select></div>
    <div className="activity-filter-field"><span>&nbsp;</span><button type="button" className={`changes-only-toggle ${changesOnly?"active":""}`} onClick={()=>setChangesOnly(v=>!v)} title="Hide sign-ins and record views — show only actions that changed data (created, updated, deleted, approved, rejected)"><Check size={14}/>{T("Data changes only")}</button></div>
    <div className="activity-filter-field"><span>{T("Start date")}</span><input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)}/></div>
    <div className="activity-filter-field"><span>{T("End date")}</span><input type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)}/></div>
  </div></div><p className="activity-count">{T(`Showing ${visible.length} of ${rows.length} entries`)}{activeFilterCount>0?` — ${activeFilterCount} filter${activeFilterCount>1?"s":""} applied`:""}</p>{visible.length?<div className="activity-table table-scroll responsive-table"><table><thead><tr>{[T("When"),T("Who"),T("Action"),T("On"),T("Status"),T("IP"),T("Details")] .map(x=><th key={x}>{x}</th>)}</tr></thead><tbody>{visible.map((r,i)=><tr key={i} className="clickable" onClick={()=>setDetail(r)}><td data-label="When">{r[0]}</td><td data-label="Who"><span className="person-cell"><Avatar initials={r[1]} small/><strong>{r[2]}</strong></span></td><td data-label="Action"><span className="action-cell"><Status>{r[3]}</Status>{T(r[4])}</span></td><td data-label="On">{T(r[5])}</td><td data-label="Status">{r[6]}</td><td data-label="IP">{r[7]}</td><td data-label="Details" onClick={e=>e.stopPropagation()}><IconButton icon={Eye} label="View details" onClick={()=>setDetail(r)}/></td></tr>)}</tbody></table></div>:<Card><Empty icon={ListChecks} title={T("No matching activity")} text="No audit entries match these filters. Try clearing one and searching again."/></Card>}{detail&&<Modal title={T("Activity detail")} subtitle={T("A complete record of this change")} onClose={()=>setDetail(null)}><Info rows={[[T("Action"),detail[3]],[T("Description"),detail[4]],[T("Actor"),detail[2]],[T("Date and time"),detail[0]],[T("On"),detail[5]],[T("IP address"),detail[7]]]}/></Modal>}</> }

function PlatformSettings({open}) {
const T=useT();
  const [member,setMember]=useState(""); const [confirm,setConfirm]=useState(""); const [issueFilter,setIssueFilter]=useState("open");
  const [issues,setIssues]=useState([
    {id:1,title:"Employee profile export failed",detail:"Export to Excel times out for departments with 50+ employees.",severity:"high",status:"open",reporter:"Arshman Afzal",reported:"Aug 11, 2026"},
    {id:2,title:"Leave balance rounding mismatch",detail:"Half-day leave shows 0.4 days instead of 0.5 on the balance card.",severity:"medium",status:"open",reporter:"Sneha Gupta",reported:"Aug 9, 2026"},
    {id:3,title:"Duplicate Slack reminder sent",detail:"Some users received the leave-approval reminder twice in one day.",severity:"low",status:"resolved",reporter:"System",reported:"Aug 3, 2026"},
  ]);
  const [flags,setFlags]=useState({maintenance:false,require2fa:false,selfRegister:false});
  const admins=[["SA","Super Admin","admin@must.company"],["SG","Sneha Gupta","g.sneha@must.company"],["AA","Arshman Afzal","a.arshman@must.company"],["RC","Rohma Chaudhary","dustyrose@must.company"],["MI","Matilda Ipeh Anashie","darkmagenta@must.company"]]; const candidates=[["RL","Ri Le Tan","ritan@must.company"],["AJ","Afroas Jameela","roazy@must.company"],["AA","Ateeq Ahmed","u.arham@must.company"],["EL","Erwin Llanera","l.erwin@must.company"]];
  const toggleIssue=(id)=>setIssues(issues.map(i=>i.id===id?{...i,status:i.status==="open"?"resolved":"open"}:i));
  const toggleFlag=(key,label)=>setFlags(f=>{announce(`${label} ${!f[key]?"enabled":"disabled"}`);return {...f,[key]:!f[key]}});
  const visibleIssues=issueFilter==="all"?issues:issues.filter(i=>i.status===issueFilter);
  return <><PageTitle title="Platform Settings" subtitle={T("Super-admin-only controls for the platform")}/><Card className="platform-card"><div className="platform-heading"><Crown size={20}/><div><h2>{T("Super Admins")}</h2><p>{T("Only a Super Admin can grant or revoke the Super Admin role.")}</p></div></div><h3>{T("CURRENT SUPER ADMINS (5)")}</h3><div className="platform-people">{admins.map(([ini,name,email])=><div key={email}><Avatar initials={ini} small/><span><strong>{name}</strong><small>{email}</small></span><button disabled={ini==="MI"} onClick={()=>open("remove-admin")}><UserMinus size={14}/>{T("Remove")}</button></div>)}</div><h3>{T("PROMOTE A USER")}</h3><SearchBox placeholder={T("Search users by name or email…")}/><div className="platform-people candidates">{candidates.map(([ini,name,email])=><div key={email}><Avatar initials={ini} small/><span><strong>{name}</strong><small>{email}</small></span><button onClick={()=>open("super-admin")}><UserPlus size={14}/>{T("Make Super Admin")}</button></div>)}</div></Card>
    <Card className="platform-card"><div className="platform-heading"><AlertTriangle size={20}/><div><h2>{T("Crashes & Reported Issues")}</h2><p>{T("Server & client crashes plus problems reported by users.")}</p></div></div><div className="employee-statuses">{["open","resolved","all"].map(x=><button key={x} className={issueFilter===x?"active":""} onClick={()=>setIssueFilter(x)}>{x} <b>{x==="all"?issues.length:issues.filter(i=>i.status===x).length}</b></button>)}</div><div className="issue-list">{visibleIssues.length?visibleIssues.map(i=><div className="issue-row" key={i.id}><span className={`issue-severity ${i.severity}`}/><div><strong>{i.title}</strong><p>{i.detail}</p><small>Reported by {i.reporter} · {i.reported}</small></div><Button kind="secondary" onClick={()=>toggleIssue(i.id)}>{i.status==="open"?T("Mark resolved"):T("Reopen")}</Button></div>):<Empty icon={Check} title={`No ${issueFilter==="all"?"":issueFilter+" "}issues`} text={issueFilter==="resolved"?"Resolved crashes and reports will appear here.":"Nothing to review right now."}/>}</div></Card>
    <Card className="platform-card"><div className="platform-heading"><Settings size={20}/><div><h2>{T("System Flags")}</h2><p>{T("Platform-wide toggles — changes apply immediately for everyone.")}</p></div></div><div className="flag-list">
      <label className="flag-toggle"><input type="checkbox" checked={flags.maintenance} onChange={()=>toggleFlag("maintenance","Maintenance mode")}/><span className="flag-toggle-track"><span className="flag-toggle-thumb"/></span><span className="flag-toggle-copy"><strong>{T("Maintenance mode")}</strong><small>{T("Shows a maintenance banner and blocks sign-in for everyone except Super Admins.")}</small></span></label>
      <label className="flag-toggle"><input type="checkbox" checked={flags.require2fa} onChange={()=>toggleFlag("require2fa","Two-factor authentication requirement")}/><span className="flag-toggle-track"><span className="flag-toggle-thumb"/></span><span className="flag-toggle-copy"><strong>{T("Require 2FA for Admin & Super Admin")}</strong><small>{T("Admin-level accounts must set up two-factor authentication before they can sign in.")}</small></span></label>
      <label className="flag-toggle"><input type="checkbox" checked={flags.selfRegister} onChange={()=>toggleFlag("selfRegister","Self-registration")}/><span className="flag-toggle-track"><span className="flag-toggle-thumb"/></span><span className="flag-toggle-copy"><strong>{T("Allow self-registration")}</strong><small>{T("Let people with a @must.company email create their own account instead of being invited.")}</small></span></label>
    </div></Card>
    <Card className="platform-card danger-zone"><div className="platform-heading"><AlertTriangle size={20}/><div><h2>{T("Danger Zone")}</h2><p>{T("Destructive actions that can't be undone — review carefully before confirming.")}</p></div></div>
      <div className="danger-block"><h3>{T("Clear notifications for one person")}</h3><p>{T("Removes every Slack DM this app has sent to the selected person — they’ll stop seeing old reminders, but new ones will still be delivered normally. Cannot be undone.")}</p><div className="danger-controls"><Select value={member} onChange={setMember}><option value="">{T("Select a member…")}</option><option>Ri Le Tan</option><option>Afroas Jameela</option></Select><Button kind="danger" disabled={!member} onClick={()=>{announce(`Slack notifications cleared for ${member}`);setMember("")}}>{T("Clear for this person")}</Button></div></div>
      <div className="danger-block danger-block-severe"><h3><AlertTriangle size={13}/>{T("Clear notifications for everyone")}</h3><p>{T("Removes every Slack DM this app has ever sent, for")} <strong>{T("all 288 employees")}</strong>{T(" at once. This cannot be undone and cannot be limited to one person after the fact — type")} <strong>CLEAR</strong>{T(" below to confirm you understand the scope.")}</p><div className="danger-controls"><input aria-label="Type CLEAR to confirm" placeholder={T("Type CLEAR to confirm")} value={confirm} onChange={e=>setConfirm(e.target.value)}/><Button kind="danger" disabled={confirm!=="CLEAR"} onClick={()=>{announce("Slack notifications cleared for everyone");setConfirm("")}}>{T("Clear for everyone")}</Button></div></div>
    </Card></> }

function FeedbackBuilder({open,go}) {const T=useT(); const [questions,setQuestions]=useState(["What went well during this review period?","Where could this employee improve?","How would you rate overall performance?"]); const [section,setSection]=useState(0); const sections=["Performance","Growth & Development","Values"]; return <><button className="back-link" onClick={()=>go("/settings/feedback-forms")}><ArrowLeft size={16}/>{T("Back to feedback forms")}</button><PageTitle eyebrow="Feedback Form" title={T("Performance Review")} subtitle={T("Build sections and questions for this feedback form")} actions={<><Button kind="secondary" icon={Eye}>{T("Preview")}</Button><Button icon={Check}>{T("Save Form")}</Button></>}/><div className="builder-layout"><Card className="builder-sidebar"><h2>{T("Sections")}</h2>{sections.map((name,i)=><button key={name} className={section===i?"active":""} onClick={()=>setSection(i)}>{i+1}. {name}</button>)}<Button kind="secondary" icon={Plus}>{T("Add Section")}</Button></Card><Card><Field label={T("Section title")}><input value={sections[section]} readOnly/></Field><Field label={T("Description")}><input defaultValue="Review the employee's delivery, strengths and development areas."/></Field><div className="question-list">{questions.map((q,i)=><div className="question" key={`${i}-${q}`}><span className="drag">⋮⋮</span><div><small>Question {i+1}</small><input value={q} onChange={e=>setQuestions(questions.map((x,j)=>j===i?e.target.value:x))}/><Select><option>{i===2?T("Rating scale"):T("Long answer")}</option><option value="Short answer">{T("Short answer")}</option><option value="Multiple choice">{T("Multiple choice")}</option></Select></div><IconButton icon={Trash2} label="Delete question" danger onClick={()=>setQuestions(questions.filter((_,j)=>j!==i))}/></div>)}</div><Button kind="secondary" icon={Plus} onClick={()=>setQuestions([...questions,"New question"])}>{T("Add Question")}</Button></Card></div></> }

// Employee-facing leave application — one continuous scrollable form (type picker, dates/time,
// balance preview, reason, attachment, approval route) matching how the live HRIS presents it.
// Step 1: compact, searchable list — name + the one or two facts that matter for picking (paid
// status, balance). Step 2: the type you picked, its full policy tucked behind a disclosure so it
// doesn't compete with the actual form, then the date/time/reason/attachment fields.
function LeaveTypePicker({ query, onQuery, onSelect, onBack, backLabel }) {
const T=useT();
  const filtered = LEAVE_TYPES.filter(t=>t.name.toLowerCase().includes(query.toLowerCase()));
  return <>
    {onBack && <button type="button" className="back-link" onClick={onBack}><ArrowLeft size={15}/>{backLabel}</button>}
    <p>{T("Choose the leave type that matches your situation.")}</p>
    <input type="hidden" required readOnly aria-hidden="true" style={{display:"none"}} value=""/>
    <SearchBox placeholder={T("Search leave types…")} value={query} onChange={onQuery}/>
    <div className="type-list">{filtered.length?filtered.map(t=><button type="button" key={t.key} className="type-list-row" onClick={()=>onSelect(t.key)}>
      <i className={`tone-dot ${t.tone}`}/>
      <span className="type-list-row-copy"><strong>{t.name}</strong><small>{t.paid?T("Paid"):T("Unpaid")} · {t.entitlement} · {t.unit}</small></span>
      <span className="type-list-row-balance">{t.balance}</span>
      <ChevronRight size={16}/>
    </button>):<p className="type-empty">No leave types match "{query}".</p>}</div>
  </>;
}

function LeaveDetailForm({ type, onBack, backLabel }) {
const T=useT();
  const [start, setStart] = useState(""); const [end, setEnd] = useState("");
  const ready = start && end;
  return <>
    <button type="button" className="back-link" onClick={onBack}><ArrowLeft size={15}/>{backLabel}</button>
    <div className="type-detail-head">
      <div className="type-detail-title"><i className={`tone-dot ${type.tone}`}/><h3>{type.name}</h3><span className={`type-paid-tag ${type.paid?"paid":"unpaid"}`}>{type.paid?"Paid":"Unpaid"}</span></div>
      <div className="type-detail-stats">
        <div><span>{T("Entitlement")}</span><strong>{type.entitlement}</strong></div>
        <div><span>{T("Unit")}</span><strong>{type.unit}</strong></div>
        <div><span>{T("Balance")}</span><strong className="green">{type.balance}</strong></div>
      </div>
      <div className="type-detail-policy"><span>{T("Policy")}</span><p>{type.policy}</p></div>
    </div>
    <div className="form-grid">
      <Field label={T("Start date")} required><input type="date" value={start} onChange={e=>setStart(e.target.value)}/></Field>
      <Field label={T("End date")} required><input type="date" value={end} onChange={e=>setEnd(e.target.value)}/></Field>
      <Field label={T("From (time)")} required><input type="time" defaultValue="09:00"/></Field>
      <Field label={T("To (time)")} required><input type="time" defaultValue="17:00"/></Field>
    </div>
    <p className="form-hint-box">{T("For a partial day, set the exact hours you'll be off (e.g. 09:00–13:00 = half day).")}</p>
    <Field label={T("Hours")} hint="Auto-calculated from the date & time window."><input disabled placeholder="—" value=""/></Field>
    <div className="balance-preview">
      <div><span>{T("Current balance")}</span><strong>{type.balance}</strong></div>
      <div><span>{T("Requested")}</span><strong>{ready?"Auto-calculated":"—"}</strong></div>
      <div><span>{T("Balance after")}</span><strong>{ready?"Auto-calculated":"—"}</strong></div>
    </div>
    <Field label={T("Reason")} required full><textarea placeholder={T("Please describe the reason for your leave request…")}/></Field>
    <Field label={T("Attachments / supporting documents (optional)")} full><div className="dropzone"><Upload size={20}/><strong>{T("Attach a file")}</strong><span>{T("PDF, image, Word or Excel")}</span></div></Field>
    <p className="form-hint-box">{T("Approval flow: The system validates your eligibility automatically, then your request goes to your reporting manager for approval, and finally to HR for the final decision.")}</p>
  </>;
}

function ApplyLeaveForm() {
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  if (!selected) return <LeaveTypePicker query={query} onQuery={setQuery} onSelect={setSelected}/>;
  const type = LEAVE_TYPES.find(t=>t.key===selected);
  return <LeaveDetailForm type={type} onBack={()=>setSelected(null)} backLabel="Back to leave types"/>;
}

// Same searchable list → focused form pattern as ApplyLeaveForm, for HRM requests — with Leave
// itself as the first entry point, so the top-nav Request CTA can reach the leave flow too.
function NewRequestForm() {
  const T=useT();
  const [selected, setSelected] = useState(null);
  const [leaveType, setLeaveType] = useState(null);
  const [query, setQuery] = useState("");
  const [leaveQuery, setLeaveQuery] = useState("");

  if (selected === "leave") {
    if (!leaveType) return <LeaveTypePicker query={leaveQuery} onQuery={setLeaveQuery} onSelect={setLeaveType} onBack={()=>setSelected(null)} backLabel="Back to request types"/>;
    const type = LEAVE_TYPES.find(t=>t.key===leaveType);
    return <LeaveDetailForm type={type} onBack={()=>setLeaveType(null)} backLabel="Back to leave types"/>;
  }

  if (!selected) {
    const q = query.trim().toLowerCase();
    const filtered = REQUEST_TYPES.filter(t=>t.name.toLowerCase().includes(q));
    const showLeave = !q || "leave".includes(q) || "time off".includes(q);
    return <>
      <p>{T("Choose what you'd like to request.")}</p>
      <input type="hidden" required readOnly aria-hidden="true" style={{display:"none"}} value=""/>
      <SearchBox placeholder={T("Search request types…")} value={query} onChange={setQuery}/>
      <div className="type-list">
        {showLeave && <button type="button" className="type-list-row" onClick={()=>setSelected("leave")}>
          <i className="tone-dot green"/>
          <span className="type-list-row-copy"><strong>{T("Leave")}</strong><small>{T("Time off & all leave types · Approval: Manager → HR")}</small></span>
          <ChevronRight size={16}/>
        </button>}
        {filtered.map(t=><button type="button" key={t.key} className="type-list-row" onClick={()=>setSelected(t.key)}>
          <i className={`tone-dot ${t.tone}`}/>
          <span className="type-list-row-copy"><strong>{t.name}</strong><small>Approval: {t.approval}</small></span>
          <ChevronRight size={16}/>
        </button>)}
        {!showLeave && !filtered.length && <p className="type-empty">No request types match "{query}".</p>}
      </div>
    </>;
  }
  const type = REQUEST_TYPES.find(t=>t.key===selected);
  return <>
    <button type="button" className="back-link" onClick={()=>setSelected(null)}><ArrowLeft size={15}/>{T("Back to request types")}</button>
    <div className="type-detail-head"><h3><i className={`tone-dot ${type.tone}`}/>{type.name}</h3><small>Approval: {type.approval}</small></div>
    <div className="form-grid"><Field label={type.fieldLabel} required full><textarea placeholder={`Describe your ${type.fieldLabel.toLowerCase()}…`}/></Field></div>
    <Field label={T("Attachments / supporting documents (optional)")} full><div className="dropzone"><Upload size={20}/><strong>{T("Attach a file")}</strong><span>{T("PDF, image, Word or Excel")}</span></div></Field>
    <p className="form-hint-box"><strong>{T("Approval flow:")}</strong> {T(type.approval)}.</p>
  </>;
}

// Footer for leave-detail/request-detail: read-only Close for employees and decided records;
// Approve/Reject — with a required rejection reason — for a lead/admin viewing a pending record.
function DetailFooter({ data, role, onClose }) {
const T=useT();
  const [confirmingReject, setConfirmingReject] = useState(false);
  const [reason, setReason] = useState("");
  const canDecide = role && role !== "Employee";
  if (!data || !canDecide || data.status !== "Pending") return <Button kind="secondary" onClick={onClose}>{T("Close")}</Button>;
  if (confirmingReject) return <div className="reject-confirm-footer">
    <textarea autoFocus placeholder={T("Explain why this is being rejected — the employee will see this reason.")} value={reason} onChange={e=>setReason(e.target.value)}/>
    <div className="reject-confirm-actions">
      <Button kind="secondary" onClick={()=>{setConfirmingReject(false);setReason("")}}>{T("Back")}</Button>
      <Button kind="danger" icon={X} onClick={()=>{if(!reason.trim()){announce("Add a reason before rejecting","error");return;}announce(`Rejected — ${reason.trim()}`,"error");onClose();}}>{T("Confirm reject")}</Button>
    </div>
  </div>;
  return <><Button kind="secondary" onClick={onClose}>{T("Close")}</Button><Button kind="danger" icon={X} onClick={()=>setConfirmingReject(true)}>{T("Reject")}</Button><Button icon={Check} onClick={()=>{announce("Approved and added to decision history");onClose();}}>{T("Approve")}</Button></>;
}

function ModalContent({type, data, role}) {
  const T=useT();
  if (["employee","team","asset","user","leave","department","entity","note","qualification","identity","salary","bank","member"].includes(type)) return <BasicForm type={type}/>;
  if (type==="document") return <div className="form-grid"><Field label="Document name" required/><Field label="Document type" required><Select><option value="Employment contract">{T("Employment contract")}</option><option value="Certificate">{T("Certificate")}</option><option value="Other">{T("Other")}</option></Select></Field><Field label="Expiry date"><input type="date"/></Field><Field label="File" required full><div className="dropzone"><Upload size={22}/><strong>{T("Choose a file or drag it here")}</strong><span>{T("PDF, DOCX, JPG or PNG up to 10 MB")}</span></div></Field></div>;
  if (type==="balance") return <><Info rows={[["Employee","Matilda Ipeh Anashie"],["Leave type","Annual Leave"],["Current allowance","15 days"],["Current balance","8 days"]]}/><div className="form-grid"><Field label="Adjustment" required><input type="number" defaultValue="0"/></Field><Field label="New balance"><input disabled value="8 days" readOnly/></Field><Field label={T("Reason")} required full><textarea placeholder={T("Explain this adjustment")}/></Field></div></>;
  if (type==="pip"||type==="ida") return <div className="form-grid"><Field label={T("Start date")} required><input type="date"/></Field><Field label="End date"><input type="date"/></Field><Field label={T("Reason")} required full><textarea/></Field><Field label="Notes" full><textarea/></Field></div>;
  if (type==="apply-leave") return <ApplyLeaveForm/>;
  if (type==="new-request") return <NewRequestForm/>;
  if (type==="leave-detail") { const d=data||LEAVE_REQUESTS[0]; return <>
    <div className="request-summary"><Avatar initials={d.initials}/><div><h3>{d.employee}</h3><p>{T(d.type)} · {d.hours}</p></div><Status>{d.status}</Status></div>
    <div className="detail-flags">
      {d.team && <span className="detail-flag">{d.team}{d.teamCode?` · ${d.teamCode}`:""}</span>}
      {d.overlap && <span className="detail-flag warn"><AlertTriangle size={12}/>{d.overlap}</span>}
      {!!d.attachments && <span className="detail-flag info"><FileText size={12}/>{d.attachments} attachment{d.attachments>1?"s":""}</span>}
    </div>
    <Info rows={[["Dates",d.dates],["Time",`${d.time} · ${d.timezone}`],["Hours",d.hours],["Submitted",d.submitted],["Reason",d.reason],["Manager",d.manager],["Current stage",d.status==="Pending"?`${d.stage} review`:"Decided"],["Balance before",d.balanceBefore],["Balance after approval",d.balanceAfter]]}/>
    <ApprovalProgress steps={d.progress}/>
    <h3>{T("Approval history")}</h3>
    <ApprovalTimeline steps={d.history} acknowledged={d.acknowledged}/>
    {role==="Employee" && <RecoveryActions status={d.status} kind="leave request"/>}
  </>; }
  if (type==="request-detail") { const d=data||REQUESTS[0]; return <>
    <div className="request-summary"><Avatar initials={d.initials}/><div><h3>{d.employee}</h3><p>{T(d.type)}</p></div><Status>{d.status}</Status></div>
    <div className="detail-flags">
      {d.team && <span className="detail-flag">{d.team}{d.teamCode?` · ${d.teamCode}`:""}</span>}
      <span className="detail-flag info">{d.approvalChain}</span>
      {!!d.attachments && <span className="detail-flag info"><FileText size={12}/>{d.attachments} attachment{d.attachments>1?"s":""}</span>}
    </div>
    <Info rows={[[T("Summary"),d.summary],...d.answers,[T("Submitted"),d.submitted],[T("Manager"),d.manager],[T("Current stage"),d.status==="Pending"?`${d.stage} review`:T("Decided")]]}/>
    <ApprovalProgress steps={d.progress}/>
    <h3>{T("Approval history")}</h3>
    <ApprovalTimeline steps={d.history} acknowledged={d.acknowledged}/>
    {role==="Employee" && <RecoveryActions status={d.status} kind="request"/>}
  </>; }
  if (type==="leave-type") return <div className="form-grid"><Field label={T("Leave type name")} required/><Field label={T("Allowance")} required><input type="number"/></Field><Field label={T("Unit")} required><Select><option value="Days">{T("Days")}</option><option value="Hours">{T("Hours")}</option></Select></Field><Field label={T("Paid leave")}><Select><option value="Yes">{T("Yes")}</option><option value="No">{T("No")}</option></Select></Field><Field label={T("Minimum duration")}><input type="number"/></Field><Field label={T("Maximum duration")}><input type="number"/></Field><Field label={T("Eligibility")}><Select><option value="All employees">{T("All employees")}</option><option value="After probation">{T("After probation")}</option></Select></Field><Field label={T("Carry over")}><Select><option value="Not allowed">{T("Not allowed")}</option><option value="Allowed">{T("Allowed")}</option></Select></Field><Field label={T("Description")} full><textarea/></Field></div>;
  if (type==="request-type") return <><div className="form-grid"><Field label={T("Request type name")} required/><Field label={T("Description")} full><textarea/></Field></div><div className="subsection"><h3>{T("Form fields")}</h3><div className="mini-row">{T("Reason")} <Status>Required</Status><IconButton icon={MoreHorizontal} label="More"/></div><Button kind="secondary" icon={Plus}>{T("Add Field")}</Button></div><div className="subsection"><h3>{T("Approval stages")}</h3><div className="mini-row">1. Team lead approval <IconButton icon={MoreHorizontal} label="More"/></div><Button kind="secondary" icon={Plus}>{T("Add Stage")}</Button></div></>;
  if (type==="announcement") return <div className="form-grid"><Field label={T("Title")} required full><input placeholder={T("e.g. Public holiday on Monday")}/></Field><Field label={T("Audience")} required><Select><option value="All employees">{T("All employees")}</option><option value="Specific department">{T("Specific department")}</option><option value="Specific team">{T("Specific team")}</option></Select></Field><Field label={T("Pin to top")}><Select><option value="No">{T("No")}</option><option value="Yes">{T("Yes")}</option></Select></Field><Field label={T("Message")} required full><textarea placeholder={T("Write the announcement…")}/></Field></div>;
  if (type==="feedback-cycle") return <div className="form-grid"><Field label={T("Cycle name")} required/><Field label={T("Feedback form")} required><Select><option value="Performance Review">{T("Performance Review")}</option><option value="Probation Review">{T("Probation Review")}</option></Select></Field><Field label={T("Start date")} required><input type="date"/></Field><Field label={T("End date")} required><input type="date"/></Field><Field label={T("Audience")} required><Select><option value="All employees">{T("All employees")}</option><option value="Selected teams">{T("Selected teams")}</option></Select></Field><Field label={T("Reviewers")}><Select><option value="Manager and self">{T("Manager and self")}</option><option value="360 feedback">{T("360 feedback")}</option></Select></Field><Field label={T("Allow negative ratings")}><Select><option value="No">{T("No")}</option><option value="Yes">{T("Yes")}</option></Select></Field><Field label={T("Lock responses after end date")}><Select><option value="Yes">{T("Yes")}</option><option value="No">{T("No")}</option></Select></Field></div>;
  if (type==="role") return <><div className="form-grid"><Field label={T("Role name")} required/><Field label={T("Description")} full><textarea/></Field></div><h3>{T("Permissions")}</h3><SearchBox placeholder={T("Search 44 permissions")}/><div className="permission-list">{["Employees","Leave management","Employee Services requests","Salary & bank","Assets","Reports","Configuration","Platform"].map((x,i)=><label key={x}><input type="checkbox" defaultChecked={i<5}/><span><strong>{x}</strong><small>{i%2?"View and manage":"View, create, edit and delete"}</small></span></label>)}</div></>;
  if (type==="feedback-form") return <div className="form-grid"><Field label={T("Form name")} required/><Field label={T("Description")} full><textarea/></Field></div>;
  if (type==="super-admin") return <><Field label={T("Select user")} required><Select><option>Sneha Gupta</option><option>Erwin Llanera</option></Select></Field><div className="warning-box"><AlertTriangle size={19}/><p>{T("This gives unrestricted access to all employee data, settings and platform controls.")}</p></div></>;
  if (type==="team-delete") return <div className="warning-box"><AlertTriangle size={20}/><p>{T("Delete “UX/UI Team”? Members will be unassigned but not deleted.")}</p></div>;
  if (type==="delete") return <><div className="warning-box"><AlertTriangle size={20}/><p><strong>{T("Delete Matilda Ipeh Anashie permanently?")}</strong> {T("This removes the employee profile and cannot be undone.")}</p></div><Info rows={[["Affected records","3 leave requests · 2 payslips · 4 documents"],["Team impact","Employee will be removed from BLK-UXI"],["Account access","Sign-in access will be revoked"],["Audit trail","A deletion record will be retained"]]}/></>;
  if (type==="terminate") return <><div className="warning-box"><AlertTriangle size={20}/><p><strong>{T("End Matilda Ipeh Anashie’s employment?")}</strong> {T("Their HR history remains available.")}</p></div><div className="form-grid"><Field label={T("Last working day")} required><input type="date"/></Field><Field label={T("Reason")} required><Select><option value="">{T("Select a reason")}</option><option value="Resignation">{T("Resignation")}</option><option value="Termination">{T("Termination")}</option><option value="Redundancy">{T("Redundancy")}</option></Select></Field><Field label={T("Access end")} full><Select><option value="At end of last working day">{T("At end of last working day")}</option><option value="Immediately">{T("Immediately")}</option></Select></Field></div></>;
  if (type==="remove-admin") return <><div className="warning-box"><AlertTriangle size={20}/><p><strong>{T("Remove Super Admin access?")}</strong> {T("The user keeps their employee account but loses all administration permissions.")}</p></div><Info rows={[["User","Sneha Gupta"],["Current role","Super Admin"],["New role","Employee"],["Effect","Active sessions will be signed out"]]}/></>;
  return <div className="warning-box"><AlertTriangle size={20}/><p>{T("This action may affect employee records and cannot always be undone. Review the target carefully before continuing.")}</p></div>;
}

const modalNames={employee:"Add / edit employee",team:"Create / edit team",asset:"Add / edit asset",user:"Create / edit user",leave:"Apply leave for employee",department:"Add / edit department",entity:"Add / edit company entity",document:"Upload document",qualification:"Add qualification",identity:"Add identity document",note:"Add HR note",pip:"Start performance improvement plan",ida:"Start disciplinary action",salary:"Add salary record",bank:"Edit bank details",balance:"Edit leave balance",announcement:"Post announcement","leave-detail":"Leave request details","request-detail":"Employee Services request details","apply-leave":"Apply for Leave","new-request":"New Request","leave-type":"Add / edit leave type","request-type":"Add / edit request type","feedback-cycle":"Create feedback cycle",role:"Manage role permissions","feedback-form":"Create feedback form","super-admin":"Add Super Admin",member:"Add team member",terminate:"Terminate employee",delete:"Delete record","team-delete":"Delete Team","remove-admin":"Remove Super Admin"};

const LOGIN_CONTENT = {
  admin: { role:"Super Admin", headline:"Welcome Back Super Admin!", subtitle:"HRIS Super Admin Console",
    desc:"One home for your work life at MUST — track your leave, view payslips, sign documents, and stay close to your team." },
  employee: { role:"Employee", headline:"Welcome Back!", subtitle:"HRIS Employee Console",
    desc:"Your home for work at MUST — track your leave, view payslips, sign documents, and stay close to your team." },
  "team-lead": { role:"Team Lead", headline:"Welcome Back Team Lead!", subtitle:"HRIS Team Lead Console",
    desc:"Approve requests, track your team’s leave, and stay close to everyone at MUST — all in one place." },
};
const LOGIN_TABS = [["admin","Admin"],["employee","Employee"],["team-lead","Team Lead"]];
function GoogleMark() {
  return <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
    <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.87 2.7-6.62Z"/>
    <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.94v2.33A9 9 0 0 0 9 18Z"/>
    <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.66 9c0-.59.1-1.16.29-1.7V4.97H.94A9 9 0 0 0 0 9c0 1.45.35 2.83.94 4.03l3.01-2.33Z"/>
    <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.42 0 9 0A9 9 0 0 0 .94 4.97l3.01 2.33C4.66 5.17 6.65 3.58 9 3.58Z"/>
  </svg>;
}
function LoginScreen({ roleKey, go, setRole }) {
  const T=useT();
  const key = LOGIN_CONTENT[roleKey] ? roleKey : "admin";
  const content = LOGIN_CONTENT[key];
  const signIn = () => { setRole(content.role); announce(`Signed in as ${content.role}`); go(roleHome(content.role)); };
  return <div className="login-screen">
    <LogoDefs/>
    <label className="login-lang"><Globe2 size={14}/><select aria-label="Language" onChange={e=>announce(`Language changed to ${e.target.value}`)}><option>ENG</option><option>KOR</option></select><ChevronDown size={12}/></label>
    <div className="login-wrap">
      <div className="login-left">
        <div className="login-brand"><svg className="logo-full"><use href="#mc-logo"/></svg></div>
        <h1>{content.headline}</h1>
        <h2>{content.subtitle}</h2>
        <p>{content.desc}</p>
        <div className="login-avatars">
          <div className="login-avatar-stack"><Avatar initials="MA" small/><Avatar initials="EL" small/><Avatar initials="IG" small/><span className="login-avatar-more">+284</span></div>
          <span><strong>287 teammates</strong> across MUST</span>
        </div>
      </div>
      <div className="login-card">
        <svg className="logo-mark login-card-mark"><use href="#mc-mark"/></svg>
        <h2>{T("Sign in")}</h2>
        <p>{T("Use your MUST account to continue.")}</p>
        <button className="google-btn" onClick={signIn}><GoogleMark/>{T("Continue with Google")}</button>
        <p className="login-lock"><LockKeyhole size={13}/>{T("Only ")}<b>@must.company</b>{T(" accounts.")}</p>
        <p className="login-help">{T("Trouble signing in?")} <a href="#" onClick={e=>{e.preventDefault();announce("Message sent to your people team");}}>{T("Talk to your people team.")}</a></p>
        <div className="login-tagline"><span>{T("CHALLENGE")}</span><span>{T("TOGETHER")}</span><span>{T("ACHIEVE")}</span></div>
        <div className="login-preview-switch-wrap"><small>{T("Prototype preview")}</small><div className="login-preview-switch">{LOGIN_TABS.map(([k,label])=><button key={k} className={k===key?"active":""} onClick={()=>go(`/login/${k}`)}>{label}</button>)}</div></div>
      </div>
    </div>
  </div>;
}

export function App() {
  const [path,go]=useRoute(); const [modal,setModal]=useState(null); const [modalData,setModalData]=useState(null); const [role,setRole]=useState(()=>window.localStorage.getItem("hris-preview-role")||"Super Admin"); const [lang,setLang]=useState(()=>window.localStorage.getItem("hris-lang")||"ENG");
  const T=(en)=>koT(lang,en);
  const openModal=(type,rowData)=>{setModal(type);setModalData(rowData||null)};
  const closeModal=()=>{setModal(null);setModalData(null)};
  useEffect(()=>{ if(path==="/") go("/dashboard") },[]);
  useEffect(()=>{window.localStorage.setItem("hris-preview-role",role);if((role==="Employee"||role==="Team Lead")&&path==="/dashboard")go("/my-dashboard")},[role,path]);
  if(path.startsWith("/login")) return <LoginScreen roleKey={path.split("/")[2]} go={go} setRole={setRole}/>;
  const isMySpace=["/my-dashboard","/my-profile","/my-salary","/my-documents","/my-team","/my-feedbacks","/my-leaves","/leave-holidays","/requests","/approvals","/sops","/decision-history"].includes(path);
  const isPreviewRole = role==="Team Lead"||role==="Employee";
  const isAdministration=path.startsWith("/settings")||path==="/activity-logs"||path==="/feedback-form-builder";
  const isManagement=!isMySpace&&!isAdministration;
  const capabilities=roleCapabilities[role];
  const denied=(!capabilities.approvals&&(path==="/approvals"||path==="/decision-history"))||(!capabilities.myTeam&&path==="/my-team")||(!capabilities.managePeople&&isManagement)||(!capabilities.administer&&isAdministration)||(role!=="Super Admin"&&path==="/settings/platform");
  let page;
  if(denied) page=<PermissionDenied go={go}/>;
  else if(isMySpace) { const myProfileTabPaths=["/my-profile","/my-salary","/my-documents","/my-feedbacks"]; const myRequestsTabPaths=["/my-leaves","/leave-holidays","/requests","/approvals"]; const requestTabs=myRequestsTabPaths.includes(path)?myRequestsTabs(role):null; const spaceTabs=myProfileTabPaths.includes(path)?MY_PROFILE_TABS:(requestTabs&&requestTabs.some(([,to])=>to===path))?requestTabs:null; page=<>{spaceTabs&&<SectionTabs tabs={spaceTabs} path={path} go={go} line/>}<MySpacePage path={path} go={go} role={role} open={openModal}/></>; }
  else if(path==="/dashboard") page=<Dashboard go={go} open={openModal} role={role}/>;
  else if(path==="/employees") page=<><SectionTabs tabs={EMPLOYEE_DIRECTORY_TABS} path={path} go={go} line/><EmployeesPage go={go} open={openModal}/></>;
  else if(path.startsWith("/employees/")) page=<EmployeePage go={go} open={openModal} path={path}/>;
  else if(path==="/teams") page=<><SectionTabs tabs={EMPLOYEE_DIRECTORY_TABS} path={path} go={go} line/><TeamsPage go={go} open={openModal}/></>;
  else if(path.startsWith("/teams/")) page=<TeamDetail go={go} open={openModal} path={path}/>;
  else if(path==="/leaves") page=<><SectionTabs tabs={LEAVE_REQUESTS_TABS} path={path} go={go} line/><LeavesPage open={openModal}/></>;
  else if(path==="/leave-balances") page=<><SectionTabs tabs={LEAVE_REQUESTS_TABS} path={path} go={go} line/><LeaveBalancesPage open={openModal}/></>;
  else if(path==="/all-requests") page=<><SectionTabs tabs={LEAVE_REQUESTS_TABS} path={path} go={go} line/><RequestsPage open={openModal}/></>;
  else if(path==="/assets") page=<AssetsPage open={openModal}/>;
  else if(path==="/org-chart") page=<><SectionTabs tabs={EMPLOYEE_DIRECTORY_TABS} path={path} go={go} line/><OrgChart/></>;
  else if(path==="/announcements") page=<AnnouncementsPage open={openModal}/>;
  else if(path==="/documents") page=<DocumentsPage open={openModal} go={go}/>;
  else if(path.startsWith("/documents/")) page=<DocumentDetail go={go} path={path}/>;
  else if(path==="/reports") page=<ReportsPage/>;
  else if(path==="/feedbacks") page=<FeedbacksPage open={openModal}/>;
  else if(path==="/settings"||path==="/settings/departments") page=<SettingsShell path={path} go={go} role={role}><SettingsList kind="departments" open={openModal}/></SettingsShell>;
  else if(path==="/settings/company-entities") page=<SettingsShell path={path} go={go} role={role}><SettingsList kind="entities" open={openModal}/></SettingsShell>;
  else if(path==="/settings/leave-types") page=<SettingsShell path={path} go={go} role={role}><SettingsList kind="leaveTypes" open={openModal}/></SettingsShell>;
  else if(path==="/settings/request-types") page=<SettingsShell path={path} go={go} role={role}><SettingsList kind="requestTypes" open={openModal}/></SettingsShell>;
  else if(path.startsWith("/settings/feedback-forms/")||path==="/feedback-form-builder") page=<FeedbackBuilder open={openModal} go={go}/>;
  else if(path==="/settings/feedback-forms") page=<SettingsShell path={path} go={go} role={role}><SettingsList kind="feedbackForms" open={(m)=>m==="feedback-form"?go("/feedback-form-builder"):setModal(m)}/></SettingsShell>;
  else if(path==="/settings/users") page=<SettingsShell path={path} go={go} role={role}><UsersPage open={openModal}/></SettingsShell>;
  else if(path==="/activity-logs") page=<SettingsShell path={path} go={go} role={role}><ActivityLogsPage/></SettingsShell>;
  else if(path==="/settings/platform") page=<SettingsShell path={path} go={go} role={role}><PlatformSettings open={openModal}/></SettingsShell>;
  else page=<><PageTitle eyebrow="Not Found" title="Page not found" subtitle="This Admin page does not exist."/><Empty action={<Button onClick={()=>go("/dashboard")}>{T("Go to dashboard")}</Button>}/></>;
  const isDecision=modal&&["delete","team-delete","terminate","remove-admin"].includes(modal);
  const isDetail=modal&&["leave-detail","request-detail"].includes(modal);
  const onSave=modal==="apply-leave"?()=>announce("Leave request submitted for approval"):modal==="new-request"?()=>announce("Request submitted for approval"):undefined;
  const setLangPersist=(v)=>{setLang(v);window.localStorage.setItem("hris-lang",v)};
  return <LangCtx.Provider value={{lang,setLang:setLangPersist}}><Shell path={path} go={go} role={role} setRole={setRole} open={openModal} isMySpace={isMySpace}>{page}{modal&&<Modal title={modalNames[modal]} subtitle={modal==="leave"?"This Admin action bypasses standard employee leave validation.":undefined} onClose={closeModal} onSave={onSave} wide={["employee","asset","request-type","role","apply-leave","new-request"].includes(modal)} footer={isDetail?<DetailFooter data={modalData} role={role} onClose={closeModal}/>:isDecision?<><Button kind="secondary" onClick={closeModal}>{T("Cancel")}</Button><Button kind={modal==="team-delete"?"primary":"danger"} icon={Trash2} onClick={()=>{announce("Action completed and recorded in Activity Logs");closeModal()}}>{T(modal==="team-delete"?"Delete Team":"Confirm action")}</Button></>:undefined}><ModalContent type={modal} data={modalData} role={role}/></Modal>}</Shell></LangCtx.Provider>;
}
