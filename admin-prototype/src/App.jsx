import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity, AlertTriangle, Archive, ArrowLeft, BarChart3, Bell, Boxes, BriefcaseBusiness,
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
  {key:"annual", name:"Annual Leaves", tone:"green", paid:true, entitlement:"96h/year", unit:"4h units", balance:"76h left",
    policy:"Employees are entitled to annual paid leave based on their employment category, MF/MS. These leave entitlements become available only after the successful completion of the employee's probation period. For employees who join the organization mid-year, leave entitlement is calculated on a pro rata basis, depending on the number of remaining months in the calendar year following completion of probation. MS – 15 days · MF – 12 days."},
  {key:"bvl", name:"Bonus Vacation Leave (BVL)", tone:"blue", paid:true, entitlement:"32h/year", unit:"any duration", balance:"0h left",
    policy:"Regular full-time employees who have completed probation may earn Bonus Vacation Leave (BVL) as a reward for consistent attendance and compliance with company policies. Employees who achieve 100% attendance, with no unpaid/short leave and no policy violations, may receive 4 days of BVL. These leaves cannot be combined with any other leave."},
  {key:"family", name:"Family Leave", tone:"pink", paid:true, entitlement:"40h/year", unit:"any duration", balance:"40h left",
    policy:"Eligible regular employees may take up to 5 consecutive days of paid Family Leave for their own marriage, serious illness of an immediate family member, or bereavement. Planned events require advance notice and supporting documents. Leave must be taken in full-day increments and is subject to approval and operational requirements."},
  {key:"maternity", name:"Maternity Leave", tone:"blue", paid:true, entitlement:"360h/year", unit:"any duration", balance:"360h left",
    policy:"Full-time regular female employees with at least one year of service are entitled to 1.5 months (45 calendar days) of paid maternity leave upon providing a medical certificate. The leave can commence up to five days before the expected delivery date. If medically justified, an employee may request additional unpaid leave, subject to management and HR approval; the paid leave is non-convertible to cash."},
  {key:"ot", name:"Overtime (OT)", tone:"amber", paid:true, entitlement:"Unlimited", unit:"any duration", balance:"Unlimited",
    policy:"The purpose of overtime is to meet urgent demands, additional workloads and critical deadlines, or to handle emergencies and peak operational hours. This policy outlines the terms under which employees may be required or allowed to work beyond regular hours, ensuring fair compensation and regulatory compliance. The maximum duration for regular overtime is 3 hours, and it must always be requested and approved before the work is performed — it cannot be applied for after the fact."},
  {key:"pto", name:"Paid Time Off (PTO)", tone:"purple", paid:true, entitlement:"Unlimited", unit:"any duration", balance:"Unlimited",
    policy:"PTO is designated for work-related scenarios where time cannot be logged through the timer application — official travel or work conducted outside the office for company business (client meetings, site visits), and attendance at company-organized events, seminars or training sessions. PTO must be applied for in advance or on the day it is being taken; late submissions are not permitted. Eligibility: all full-time employees."},
  {key:"holiday", name:"Public Holiday", tone:"green", paid:true, entitlement:"120h/year", unit:"any duration", balance:"48h left",
    policy:"Full-time employees who have completed their probation are entitled to 15 paid public holidays annually. Employees with less than one year of tenure must also have achieved at least 80% attendance in the previous month to be eligible; this requirement is waived for employees with one year or more of service."},
  {key:"tenure", name:"Tenure leave", tone:"blue", paid:true, entitlement:"40h/year", unit:"any duration", balance:"8h left",
    policy:"Tenure Leave is an additional paid leave granted to employees on the anniversary of their employment as recognition of their continued service. Employees become eligible after completing one full year of service. The leave is provided incrementally according to completed years of service, starting from 1 day after the first year and increasing up to a maximum of 5 days after five or more years of service."},
  {key:"uto", name:"Unpaid Time Off (UTO)", tone:"red", paid:false, entitlement:"Unlimited", unit:"any duration", balance:"Unlimited",
    policy:"Monday–Friday employees have a monthly limit of 8 hours; Monday–Saturday employees, 16 hours. Consecutive unpaid leave is not allowed by default, and requests for more than 2 unpaid days (16 hours) must be approved by the Business Head or higher. UTO is available only after Annual Leave has been exhausted, and employees must provide a valid reason for the absence."},
  {key:"vl", name:"Vacation Leave (VL)", tone:"blue", paid:true, entitlement:"24h/year", unit:"any duration", balance:"24h left",
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
  "/my-leaves": ["My Leaves", "My Leaves", "Your leave balance and requests"],
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
  ["Overview", [
    ["Dashboard", "/dashboard", LayoutDashboard],
  ]],
  ["People", [
    ["Employee Directory", "/employees", Users], ["Announcements", "/announcements", Megaphone],
  ]],
  ["Time & Requests", [
    ["Leave & Requests", "/leaves", CalendarDays], ["Feedback Cycles", "/feedbacks", MessageSquareText],
  ]],
  ["Assets & Reports", [
    ["Assets", "/assets", Boxes], ["Documents", "/documents", FileText], ["Reports", "/reports", BarChart3],
  ]],
  ["Settings", [
    ["Settings", "/settings", Settings],
  ]],
  ["My Space", [
    ["My Dashboard", "/my-dashboard", LayoutDashboard], ["My Profile", "/my-profile", UserCog],
    ["My Team", "/my-team", Users], ["My Leaves & Requests", "/my-leaves", CalendarDays],
  ]],
];

const MY_SPACE_FLAT_EMPLOYEE = [
  ["Dashboard", "/my-dashboard", LayoutDashboard], ["My Profile", "/my-profile", UserCog],
  ["My Salary", "/my-salary", CircleDollarSign], ["My Documents", "/my-documents", FileText],
  ["SOPs & Policies", "/sops", NotebookPen], ["My Team", "/my-team", Users],
  ["My Feedbacks", "/my-feedbacks", MessageSquareText], ["My Leaves", "/my-leaves", CalendarDays],
  ["My Requests", "/requests", ClipboardCheck],
];
const MY_SPACE_FLAT_TEAM_LEAD = [
  ...MY_SPACE_FLAT_EMPLOYEE,
  ["Team Requests", "/approvals", Archive, 2], ["Decision history", "/decision-history", History],
];

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
  const tabs = [["My Leaves", "/my-leaves", CalendarDays], ["Requests", "/requests", ClipboardCheck]];
  if (role !== "Employee") tabs.push(["Approvals", "/approvals", Archive]);
  return tabs;
}
function SectionTabs({ tabs, path, go, line }) {
  if (line) return <div className="tabs-scroll"><div className="tabs line-tabs section-line-tabs">{tabs.map(([label, to]) => <button key={to} className={path === to ? "active" : ""} onClick={() => go(to)}>{label}</button>)}</div></div>;
  return <div className="section-tabs">{tabs.map(([label, to, Icon]) => <button key={to} className={path === to ? "active" : ""} onClick={() => go(to)}><Icon size={15}/>{label}</button>)}</div>;
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

const avatarPalette = [["#018038","#016A2D"],["#0B4F75","#08344C"],["#5B3E8C","#402A63"],["#96650F","#74500C"],["#3A3D3C","#242424"],["#0F6B5C","#0B4F45"]];
function avatarColor(seed = "") { let h = 0; for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0; const [a, b] = avatarPalette[h % avatarPalette.length]; return `linear-gradient(145deg,${a},${b})`; }
function Avatar({ initials = "M", small = false }) { return <span className={`avatar ${small ? "small" : ""}`} style={{background: avatarColor(initials)}}>{initials}</span>; }
function Status({ children }) { return <span className={`status ${String(children).toLowerCase().replaceAll(" ", "-")}`}>{children}</span>; }
function IconButton({ icon: Icon, label, onClick, danger = false, success = false, className = "" }) { return <button className={`icon-btn ${danger ? "danger" : ""} ${success ? "success" : ""} ${className}`} aria-label={label} title={label} onClick={onClick || (()=>announce(`${label} action opened`))}><Icon size={17}/></button>; }
const FILTER_DOT_GREEN=["Active","Approved","Created","Logged in","Completed"];
const FILTER_DOT_RED=["Blocked","Rejected","Deleted"];
function filterDotTone(opt) { return FILTER_DOT_GREEN.includes(opt) ? "green" : FILTER_DOT_RED.includes(opt) ? "red" : "gray"; }
// Single-trigger filter dropdown styled like the profile switcher (rows with a status dot,
// checkmark on the selected option) instead of a native select or a row of toggle pills.
function FilterMenu({ value, options, onChange, counts }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => { const onDoc = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }; document.addEventListener("mousedown", onDoc); return () => document.removeEventListener("mousedown", onDoc); }, []);
  return <div className="filter-menu" ref={ref}>
    <button type="button" className="filter-menu-trigger" onClick={()=>setOpen(v=>!v)} aria-expanded={open}><i className={`tone-dot ${filterDotTone(value)}`}/><span>{value}</span>{counts?.[value]!=null && <b>{counts[value]}</b>}<ChevronDown size={13}/></button>
    {open && <div className="filter-menu-popover">{options.map(opt=><button type="button" key={opt} className={`profile-row ${opt===value?"selected":""}`} onClick={()=>{onChange(opt);setOpen(false)}}>
      <i className={`tone-dot ${filterDotTone(opt)}`}/>
      <span className="profile-row-copy"><strong>{opt}</strong></span>
      {counts?.[opt]!=null && <small className="filter-menu-count">{counts[opt]}</small>}
      {opt===value && <Check size={16}/>}
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
function PageTitle({ eyebrow, title, subtitle, actions, className = "" }) { return <div className={`page-title ${className}`}><div>{eyebrow&&<span className="eyebrow">{eyebrow}</span>}<h1>{title}</h1><p>{subtitle}</p></div>{actions && <div className="page-actions">{actions}</div>}</div>; }
function Toolbar({ children }) { return <div className="toolbar">{children}</div>; }
function SearchBox({ placeholder = "Search", value, onChange }) { return <label className="search-box"><Search size={17}/><input aria-label={placeholder} placeholder={placeholder} value={value || ""} onChange={e => onChange?.(e.target.value)}/></label>; }
function Select({ children, value, onChange, label }) { return <label className="select-wrap">{label && <span>{label}</span>}<select value={value} onChange={e => onChange?.(e.target.value)}>{children}</select><ChevronDown size={14}/></label>; }
function Empty({ icon: Icon = FileText, title = "No records found", text = "There is nothing to display yet.", action }) { return <div className="empty"><span><Icon size={24}/></span><h3>{title}</h3><p>{text}</p>{action}</div>; }
function ErrorState({ message = "Something went wrong while loading this data." }) { return <div className="error-state"><AlertTriangle size={22}/><div><strong>Unable to load data</strong><p>{message}</p></div><Button kind="secondary" icon={RotateCcw}>Try again</Button></div>; }

function DataTable({ columns, rows, renderActions, onRow, selectable, selected, onToggle, onToggleAll, getKey }) {
  const keyOf = (row, i) => getKey ? getKey(row, i) : i;
  return <div className="table-scroll responsive-table"><table><thead><tr>{selectable && <th className="checkbox-cell"><input type="checkbox" checked={rows.length>0 && selected?.size===rows.length} onChange={onToggleAll} aria-label="Select all"/></th>}{columns.map(c => <th key={c}>{c}</th>)}{renderActions && <th>Actions</th>}</tr></thead><tbody>{rows.map((row, i) => <tr key={i} onClick={() => onRow?.(row)} className={onRow ? "clickable" : ""}>{selectable && <td className="checkbox-cell" data-label="" onClick={e=>e.stopPropagation()}><input type="checkbox" checked={!!selected?.has(keyOf(row,i))} onChange={()=>onToggle(keyOf(row,i))} aria-label="Select row"/></td>}{row.map((cell, j) => <td data-label={columns[j]} key={j}>{j === row.length - 1 && ["Active","Inactive","Pending","Approved","Rejected","Completed","Cancelled","Expired","Available","Assigned","Open","Resolved"].includes(cell) ? <Status>{cell}</Status> : cell}</td>)}{renderActions && <td data-label="Actions" onClick={e => e.stopPropagation()}>{renderActions(row, i)}</td>}</tr>)}</tbody></table></div>;
}

function Modal({ title, subtitle, children, onClose, wide = false, footer, onSave }) {
  const save=()=>{const dialog=document.querySelector(".modal");const missing=[...dialog.querySelectorAll("[required]")].filter(x=>!String(x.value||"").trim());dialog.querySelectorAll(".invalid").forEach(x=>x.classList.remove("invalid"));if(missing.length){missing.forEach(x=>x.classList.add("invalid"));missing[0].focus();announce("Complete the required fields before saving","error");return;}if(onSave)onSave();else announce(`${title} saved`);onClose();};
  return <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}><div className={`modal ${wide ? "wide" : ""}`} role="dialog" aria-modal="true" aria-label={title}><header><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div><IconButton icon={X} label="Close" onClick={onClose}/></header><div className="modal-body">{children}</div>{footer!==false && <footer>{footer || <><Button kind="secondary" onClick={onClose}>Cancel</Button><Button icon={Check} onClick={save}>Save</Button></>}</footer>}</div></div>;
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
  const act = (label) => onAction ? onAction(label) : announce(`${label} — ${kind}`);
  if (status === "Pending") return <div className="recovery-actions"><Button kind="secondary" icon={Edit3} onClick={()=>act("Edit request")}>Edit</Button><Button kind="danger" icon={X} onClick={()=>act("Cancel request")}>Cancel request</Button></div>;
  if (status === "Rejected") return <div className="recovery-actions"><Button icon={RotateCcw} onClick={()=>act("Fix and reapply")}>Fix & reapply</Button></div>;
  if (status === "Cancelled" || status === "Expired") return <div className="recovery-actions"><Button kind="secondary" icon={Archive} onClick={()=>act("Duplicate request")}>Duplicate</Button><Button icon={RotateCcw} onClick={()=>act("Reapply")}>Reapply</Button></div>;
  if (status === "Approved") return <div className="recovery-actions"><Button kind="secondary" icon={X} onClick={()=>act("Request cancellation")}>Request cancellation</Button></div>;
  return null;
}
// Small footer caption — never repeats the status word already shown as the card's badge; shows
// what's actually useful instead (who it's waiting on, or when it was decided).
function statusFootNote(d) { return d.status === "Pending" ? `Waiting on ${d.stage} review` : `Updated ${d.history[d.history.length-1].time}`; }
function Field({ label, required, children, hint, full = false }) { const native=React.isValidElement(children)&&typeof children.type==="string"&&["input","textarea","select"].includes(children.type); const control=children?(native?React.cloneElement(children,{required:required||children.props.required,"aria-required":required||undefined}):children):<input required={required} aria-required={required||undefined}/>; return <label className={`field ${full ? "full" : ""}`}><span>{label}{required && " *"}</span>{control}{hint && <small>{hint}</small>}</label>; }
function BasicForm({ type }) {
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
  return <div className="form-grid">{(forms[type] || []).map((f, i) => <Field key={f} label={f} required={i < 3} full={f === "Notes" || f === "Description" || f === "Reason"}><input type={f.toLowerCase().includes("date") ? "date" : "text"} placeholder={`Enter ${f.toLowerCase()}`}/></Field>)}</div>;
}

const roleRules = {
  "Super Admin": ["Overview","People","Time & Requests","Assets & Reports","Settings","My Space"],
  "Admin": ["Overview","People","Time & Requests","Assets & Reports","Settings","My Space"],
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
        <div><h3>Ask HRIS</h3><p>Find people, facts and pages — instantly</p></div>
        <button className="ask-hris-close" aria-label="Close Ask HRIS" onClick={() => setOpen(false)}><X size={18}/></button>
      </div>
      <div className="ask-hris-body" ref={bodyRef}>
        {messages.map((m, i) => <div className={`ask-hris-bubble ${m.from}`} key={i}>{m.text}</div>)}
        <div className="ask-hris-suggestions">
          {suggestions.map(s => <button key={s.text} onClick={() => send(s.text)}>{s.text}</button>)}
        </div>
      </div>
      <div className="ask-hris-input-row">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about a person, a fact or a page…" onKeyDown={e => { if (e.key === "Enter") send(input); }}/>
        <button className="ask-hris-send" aria-label="Send" onClick={() => send(input)}><Send size={16}/></button>
      </div>
    </div>}
    <button className={`ask-hris ${scrolling && !open ? "docked" : ""}`} aria-label={open ? "Close Ask HRIS" : "Ask HRIS"} onClick={() => { setScrolling(false); setOpen(v => !v); }}><MessageCircle size={16}/>Ask HRIS</button>
  </>;
}
function LogoDefs() {
  return <svg width="0" height="0" style={{position:"absolute"}} aria-hidden="true"><symbol id="mc-logo" viewBox="0 0 247 68">    <rect width="16.8494" height="67.3976" fill="currentColor"/><rect x="25.2734" width="16.8494" height="67.3976" fill="currentColor"/><rect x="50.5469" width="16.8494" height="67.3976" fill="#018038"/>    <path d="M159.727 38.4254V21.4706H153.263V16.5684H172.114V21.4706H165.68V38.4254H159.727Z" fill="currentColor"/><path d="M143.582 38.4256C141.866 38.4256 140.211 38.2123 138.614 37.7859C137.038 37.3391 135.751 36.7704 134.754 36.0799L136.699 31.6322C137.637 32.2415 138.714 32.7492 139.931 33.1554C141.168 33.5412 142.395 33.7342 143.612 33.7342C144.43 33.7342 145.089 33.6631 145.587 33.5209C146.086 33.3585 146.445 33.1554 146.665 32.9117C146.904 32.6476 147.024 32.343 147.024 31.9978C147.024 31.5103 146.804 31.1245 146.365 30.8401C145.926 30.5558 145.358 30.3223 144.66 30.1395C143.961 29.9567 143.183 29.7739 142.325 29.5911C141.487 29.4083 140.639 29.1748 139.782 28.8905C138.944 28.6061 138.176 28.2406 137.477 27.7938C136.779 27.3267 136.21 26.7275 135.771 25.9964C135.332 25.245 135.113 24.3006 135.113 23.1633C135.113 21.8838 135.452 20.7262 136.131 19.6904C136.829 18.6547 137.866 17.822 139.243 17.1924C140.619 16.5628 142.335 16.248 144.39 16.248C145.767 16.248 147.114 16.4105 148.43 16.7355C149.767 17.0401 150.954 17.4971 151.992 18.1063L150.166 22.5845C149.168 22.0361 148.181 21.63 147.203 21.3659C146.226 21.0816 145.278 20.9395 144.36 20.9395C143.542 20.9395 142.884 21.0308 142.385 21.2136C141.886 21.3761 141.527 21.5995 141.308 21.8838C141.088 22.1681 140.979 22.4931 140.979 22.8587C140.979 23.3258 141.188 23.7015 141.607 23.9858C142.046 24.2498 142.615 24.4732 143.313 24.656C144.031 24.8185 144.809 24.9911 145.647 25.1739C146.505 25.3567 147.353 25.5902 148.191 25.8746C149.049 26.1386 149.827 26.5041 150.525 26.9713C151.223 27.4181 151.782 28.0172 152.201 28.7686C152.64 29.4997 152.859 30.4238 152.859 31.5408C152.859 32.7797 152.51 33.9271 151.812 34.9832C151.134 36.019 150.106 36.8516 148.73 37.4812C147.373 38.1108 145.657 38.4256 143.582 38.4256Z" fill="currentColor"/><path d="M122.363 38.4249C119.271 38.4249 116.857 37.5617 115.121 35.8355C113.385 34.1092 112.518 31.6619 112.518 28.4937V16.6738H118.443V28.3109C118.443 30.1388 118.792 31.4487 119.49 32.2408C120.209 33.0328 121.186 33.4288 122.423 33.4288C123.66 33.4288 124.628 33.0328 125.326 32.2408C126.024 31.4487 126.374 30.1388 126.374 28.3109V16.6738H132.209V28.4937C132.209 31.6619 131.341 34.1092 129.606 35.8355C127.87 37.5617 125.456 38.4249 122.363 38.4249Z" fill="currentColor"/><path d="M83.8672 38.4254V16.5684H88.7363L97.3993 31.4311H94.8303L103.254 16.5684H108.123L108.183 38.4254H102.746L102.687 25.2175H103.613L97.3096 36.2709H94.6809L88.1986 25.2175H89.3338V38.4254H83.8672Z" fill="currentColor"/><path d="M233.216 67.4746V58.5368L234.576 62.13L225.319 46.3379H231.501L238.185 57.7819H234.606L241.32 46.3379H246.998L237.771 62.13L239.072 58.5368V67.4746H233.216Z" fill="currentColor"/><path d="M203.911 67.4746V46.3379H208.753L220.218 60.4089H217.931V46.3379H223.693V67.4746H218.851L207.386 53.4036H209.673V67.4746H203.911Z" fill="currentColor"/><path d="M178.17 67.4746L187.325 46.3379H193.103L202.287 67.4746H196.184L189.014 49.2668H191.325L184.155 67.4746H178.17ZM183.177 63.368L184.688 58.9595H194.821L196.332 63.368H183.177Z" fill="currentColor"/><path d="M160.013 67.4746V46.3379H169.495C171.391 46.3379 173.021 46.6499 174.384 47.2739C175.767 47.898 176.834 48.8038 177.585 49.9915C178.335 51.1591 178.711 52.5481 178.711 54.1585C178.711 55.7487 178.335 57.1277 177.585 58.2952C176.834 59.4628 175.767 60.3686 174.384 61.0128C173.021 61.6368 171.391 61.9488 169.495 61.9488H163.272L165.88 59.352V67.4746H160.013ZM165.88 59.9862L163.272 57.2384H169.139C170.364 57.2384 171.273 56.9666 171.866 56.4231C172.478 55.8796 172.784 55.1247 172.784 54.1585C172.784 53.1721 172.478 52.4071 171.866 51.8636C171.273 51.3201 170.364 51.0484 169.139 51.0484H163.272L165.88 48.3006V59.9862Z" fill="currentColor"/><path d="M131.831 67.4746V46.3379H136.66L145.253 60.7108H142.705L151.06 46.3379H155.889L155.949 67.4746H150.556L150.497 54.702H151.415L145.164 65.3911H142.557L136.127 54.702H137.253V67.4746H131.831Z" fill="currentColor"/><path d="M117.167 67.7699C115.505 67.7699 113.972 67.5025 112.567 66.9678C111.162 66.433 109.935 65.6803 108.886 64.7097C107.857 63.7194 107.056 62.5706 106.482 61.2633C105.908 59.9561 105.621 58.52 105.621 56.9553C105.621 55.3905 105.908 53.9545 106.482 52.6472C107.056 51.34 107.857 50.2011 108.886 49.2305C109.935 48.2402 111.162 47.4776 112.567 46.9428C113.972 46.408 115.505 46.1406 117.167 46.1406C118.849 46.1406 120.383 46.408 121.768 46.9428C123.173 47.4776 124.39 48.2402 125.419 49.2305C126.448 50.2011 127.25 51.34 127.823 52.6472C128.417 53.9545 128.714 55.3905 128.714 56.9553C128.714 58.52 128.417 59.966 127.823 61.293C127.25 62.6003 126.448 63.7392 125.419 64.7097C124.39 65.6803 123.173 66.433 121.768 66.9678C120.383 67.5025 118.849 67.7699 117.167 67.7699ZM117.167 62.8974C117.959 62.8974 118.691 62.7588 119.364 62.4815C120.057 62.2042 120.65 61.808 121.145 61.293C121.659 60.7582 122.055 60.1244 122.332 59.3916C122.629 58.6587 122.777 57.8466 122.777 56.9553C122.777 56.0442 122.629 55.2321 122.332 54.519C122.055 53.7862 121.659 53.1622 121.145 52.6472C120.65 52.1125 120.057 51.7064 119.364 51.4291C118.691 51.1518 117.959 51.0132 117.167 51.0132C116.376 51.0132 115.634 51.1518 114.941 51.4291C114.269 51.7064 113.675 52.1125 113.16 52.6472C112.666 53.1622 112.27 53.7862 111.973 54.519C111.696 55.2321 111.558 56.0442 111.558 56.9553C111.558 57.8466 111.696 58.6587 111.973 59.3916C112.27 60.1244 112.666 60.7582 113.16 61.293C113.675 61.808 114.269 62.2042 114.941 62.4815C115.634 62.7588 116.376 62.8974 117.167 62.8974Z" fill="currentColor"/><path d="M95.2988 67.7699C93.6564 67.7699 92.1327 67.5124 90.7277 66.9975C89.3425 66.4627 88.1354 65.71 87.1065 64.7395C86.0973 63.7689 85.3057 62.63 84.7319 61.3227C84.158 59.9957 83.8711 58.5398 83.8711 56.9553C83.8711 55.3707 84.158 53.9248 84.7319 52.6175C85.3057 51.2905 86.0973 50.1417 87.1065 49.1711C88.1354 48.2006 89.3425 47.4578 90.7277 46.9428C92.1327 46.408 93.6564 46.1406 95.2988 46.1406C97.2182 46.1406 98.9299 46.4773 100.434 47.1508C101.957 47.8242 103.224 48.7948 104.233 50.0624L100.493 53.4494C99.8204 52.6571 99.0783 52.053 98.267 51.6371C97.4755 51.2211 96.585 51.0132 95.5956 51.0132C94.7447 51.0132 93.9631 51.1518 93.2507 51.4291C92.5383 51.7064 91.9249 52.1125 91.4104 52.6472C90.9157 53.1622 90.5199 53.7862 90.2231 54.519C89.9461 55.2519 89.8075 56.064 89.8075 56.9553C89.8075 57.8466 89.9461 58.6587 90.2231 59.3916C90.5199 60.1244 90.9157 60.7582 91.4104 61.293C91.9249 61.808 92.5383 62.2042 93.2507 62.4815C93.9631 62.7588 94.7447 62.8974 95.5956 62.8974C96.585 62.8974 97.4755 62.6894 98.267 62.2735C99.0783 61.8575 99.8204 61.2534 100.493 60.4611L104.233 63.8481C103.224 65.096 101.957 66.0665 100.434 66.7598C98.9299 67.4332 97.2182 67.7699 95.2988 67.7699Z" fill="currentColor"/>  </symbol><symbol id="mc-mark" viewBox="0 0 67.4 67.4"><rect width="16.8494" height="67.3976" fill="currentColor"/><rect x="25.2734" width="16.8494" height="67.3976" fill="currentColor"/><rect x="50.5469" width="16.8494" height="67.3976" fill="#018038"/></symbol></svg>;
}
function PreviewSidebar({ path, go, role, drawer, setDrawer }) {
  const items = role === "Team Lead" ? MY_SPACE_FLAT_TEAM_LEAD : MY_SPACE_FLAT_EMPLOYEE;
  const identity = roleProfile(role);
  const displayName = PREVIEW_DISPLAY_NAME[role] || identity.name;
  return <aside className={`sidebar ${drawer ? "open" : ""}`}>
    <div className="brand"><a className="brandmark" href="/my-dashboard" onClick={e=>{e.preventDefault();go("/my-dashboard")}}><svg className="logo-full"><use href="#mc-logo"/></svg><svg className="logo-mark"><use href="#mc-mark"/></svg></a></div>
    <div className="navlabel">My Space</div>
    <div className="nav-scroll"><div className="nav-group"><div className="nav-group-items"><div>{items.map(([label,to,Icon,badge]) => <button title={label} key={to} className={path===to?"active":""} onClick={()=>{go(to);setDrawer(false)}}><Icon size={18}/><span>{label}</span>{badge && <span className="nav-badge">{badge}</span>}</button>)}</div></div></div></div>
    <div className="side-user"><Avatar initials={identity.initials} small/><span><strong>{displayName}</strong><small>{role} · {identity.team}</small></span></div>
  </aside>;
}
function Shell({ path, go, children, role, setRole, open, isMySpace }) {
  const showRequest = isMySpace && path !== "/approvals" && path !== "/decision-history";
  role = role || "Super Admin";
  const isPreviewRole = role === "Team Lead" || role === "Employee";
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
    <LogoDefs/>{isPreviewRole ? <PreviewSidebar path={path} go={go} role={role} drawer={drawer} setDrawer={setDrawer}/> : <aside className={`sidebar ${drawer ? "open" : ""}`}><div className="brand"><a className="brandmark" href="/dashboard" onClick={e=>{e.preventDefault();go("/dashboard")}}><svg className="logo-full"><use href="#mc-logo"/></svg><svg className="logo-mark"><use href="#mc-mark"/></svg></a><IconButton icon={PanelLeftClose} label={drawer?"Close menu":collapsed?"Expand sidebar":"Collapse sidebar"} onClick={()=>drawer?setDrawer(false):setCollapsed(!collapsed)}/></div><div className="nav-scroll">{navGroups.filter(([group])=>roleRules[role].includes(group)).map(([group, items]) => <div className="nav-group" key={group}><button className="nav-group-toggle" aria-expanded={!closedGroups.has(group)} onClick={()=>toggleGroup(group)}><span>{group}</span><ChevronDown size={13} className={closedGroups.has(group)?"closed-arrow":""}/></button><div className={`nav-group-items ${closedGroups.has(group)?"closed":""}`}><div>{items.filter(([label])=>role!=="Employee"||!["My Team","Approvals"].includes(label)).map(([label,to,Icon]) => <button title={label} key={to} className={(path === to || (to === "/employees" && (path.startsWith("/employees/")||path==="/teams"||path.startsWith("/teams/")||path==="/org-chart")) || (to === "/leaves" && (path==="/leave-balances"||path==="/all-requests")) || (to === "/my-profile" && (path==="/my-salary"||path==="/my-documents"||path==="/my-feedbacks")) || (to === "/my-leaves" && (path==="/requests"||path==="/approvals")) || (to === "/settings" && (path.startsWith("/settings/")||path==="/activity-logs"||path==="/feedback-form-builder"))) ? "active" : ""} onClick={() => { go(to); setDrawer(false); }}><Icon size={18}/><span>{label}</span></button>)}</div></div></div>)}</div></aside>}
    {drawer && <button className="scrim" aria-label="Close menu" onClick={() => setDrawer(false)}/>} 
    <div className="workspace"><header className="topbar"><button className="menu-btn" aria-label="Open menu" onClick={() => setDrawer(true)}><Menu size={20}/></button><svg className="mobile-logo"><use href="#mc-logo"/></svg>{crumbParent&&<div className="breadcrumbs"><span>{crumbParent}</span><b>/</b><strong>{crumb}</strong></div>}<div className="top-search"><Search size={17}/><input aria-label="Search employees globally" placeholder={isPreviewRole ? "Search employees, documents…" : "Search employees…"} value={globalQ} onChange={e=>setGlobalQ(e.target.value)}/>{globalQ&&<div className="global-results">{searchHits.length?searchHits.map(e=><button key={e[0]} onClick={()=>{go("/employees/matilda");setGlobalQ("")}}><Avatar initials={e[5]} small/><span><strong>{e[0]}</strong><small>{e[1]}</small></span></button>):<p>No employees found</p>}</div>}</div><div className="top-actions"><label className="language" title="Language"><Globe2 size={16}/><select aria-label="Language" onChange={e=>announce(`Language changed to ${e.target.value}`)}><option>English</option><option>한국어</option></select><ChevronDown size={12}/></label><div className="quick-create">{path==="/approvals"?null:showRequest?<Button icon={Plus} onClick={()=>open?.("new-request")}>Request</Button>:<><Button icon={Plus} onClick={()=>{setQuickCreate(!quickCreate);setNotices(false);setAccount(false)}}>Create</Button>{quickCreate&&<div className="quick-create-menu"><button onClick={()=>{open?.("employee");setQuickCreate(false)}}><UserPlus size={14}/>Add Employee</button><button onClick={()=>{open?.("team");setQuickCreate(false)}}><Network size={14}/>Create Team</button><button onClick={()=>{open?.("user");setQuickCreate(false)}}><UserCog size={14}/>Invite User</button><button onClick={()=>{open?.("announcement");setQuickCreate(false)}}><Megaphone size={14}/>Post Announcement</button></div>}</>}</div><span className="notif-wrap"><IconButton icon={Bell} label="Notifications" onClick={()=>{setNotices(!notices);setQuickCreate(false);setAccount(false)}}/><span className="notif-count">3</span></span><button className="account" title={`${identity.name} — ${role}`} aria-label={`Account menu for ${identity.name}, ${role}`} onClick={()=>{setAccount(!account);setQuickCreate(false);setNotices(false)}}><Avatar initials={identity.initials}/><ChevronDown size={14}/></button></div>{notices&&<div className="header-popover notifications"><h3>Needs your attention</h3><p>{role==="Employee"?"3 announcements and reminders need your attention.":role==="Team Lead"?"2 approvals and 1 reminder need your attention.":"2 approvals and 1 reported issue need review."}</p><button onClick={()=>{go(role==="Employee"?"/my-dashboard":role==="Team Lead"?"/approvals":"/leaves");setNotices(false)}}>Review now</button></div>}{account&&<div className="header-popover account-menu"><div className="account-menu-id"><Avatar initials={identity.initials}/><span><strong>{identity.name}</strong><small>{role}</small></span></div><strong>Quick links</strong><div className="profile-switch-list">{[["My Salary","/my-salary",CircleDollarSign],["My Documents","/my-documents",FileText],["My Feedback","/my-feedbacks",MessageSquareText]].map(([label,to,Icon])=><button className="profile-row" key={to} onClick={()=>{go(to);setAccount(false)}}><Icon size={16}/><span className="profile-row-copy"><strong>{label}</strong></span></button>)}</div><div className="preview-switch"><strong>{isPreviewRole?"Switch profile":"Preview access"}</strong><p>Prototype preview — lets you demo other role views. Not shipped to real users.</p><div className="profile-switch-list">{Object.keys(roleRules).map(item=>{const p=roleProfile(item); const displayName=(isPreviewRole&&PREVIEW_DISPLAY_NAME[item])?PREVIEW_DISPLAY_NAME[item]:p.name; return <button className={`profile-row ${role===item?"selected":""}`} key={item} onClick={()=>{setRole(item);setAccount(false);go(roleHome(item));announce(`Viewing as ${item}`)}}><Avatar initials={p.initials} small/><span className="profile-row-copy"><strong>{item}</strong><small>{displayName} · {p.title}</small></span>{role===item&&<Check size={16}/>}</button>})}</div></div><button onClick={()=>{const key=role==="Team Lead"?"team-lead":role==="Employee"?"employee":"admin";setAccount(false);go(`/login/${key}`)}}>Sign out</button></div>}</header><main className="content">{children}</main></div>
    <AskHris role={role} go={go} identity={identity} scrolling={scrolling} setScrolling={setScrolling}/>
    <button className={`report-issue ${scrolling?"docked":""}`} aria-label="Report an issue" onClick={()=>{setScrolling(false);announce("Issue report opened — describe the problem and attach evidence")}}><MessageSquareText size={16}/>Report an issue</button>{toast&&<div className={`toast ${toast.tone||"success"}`} role="status">{toast.message}<button aria-label="Dismiss notification" onClick={()=>setToast(null)}><X size={14}/></button></div>}
  </div>;
}

function DashboardIllustration() {
  return <svg className="dash-illustration" viewBox="0 0 200 210" fill="none" aria-hidden="true">
    <circle cx="100" cy="104" r="92" fill="#E6F4EC"/>
    <ellipse cx="98" cy="204" rx="52" ry="7" fill="#01803814"/>
    <path d="M60 210V158C60 128 77 114 99 114C121 114 138 128 138 158V210Z" fill="#016A2D"/>
    <path d="M60 210V158C60 132 74 118 92 115C78 121 68 135 68 158V210Z" fill="#014F22"/>
    <rect x="85" y="122" width="28" height="18" rx="6" fill="#F2C293"/>
    <circle cx="99" cy="88" r="35" fill="#F7D2A6"/>
    <path d="M65 84C65 61 80 46 99 46C118 46 133 61 133 84C124 71 116 67 99 67C82 67 74 71 65 84Z" fill="#2B2320"/>
    <circle cx="87" cy="90" r="3.6" fill="#2B2320"/>
    <circle cx="111" cy="90" r="3.6" fill="#2B2320"/>
    <path d="M91 101C94 104 104 104 107 101" stroke="#2B2320" strokeWidth="2.6" strokeLinecap="round"/>
    <rect x="89" y="135" width="20" height="9" rx="3" fill="#fff"/>
    <path d="M136 148C150 141 160 122 157 104" stroke="#016A2D" strokeWidth="17" strokeLinecap="round"/>
    <circle cx="159" cy="100" r="13" fill="#F7D2A6"/>
    <path d="M62 190C68 178 78 172 92 172" stroke="#014F22" strokeWidth="10" strokeLinecap="round"/>
  </svg>;
}
function SpaceTabs({ space, setSpace }) {
  return <div className="tabs-scroll"><div className="tabs line-tabs section-line-tabs">{[["My Space","me"],["MUST Space","must"]].map(([label,key]) => <button key={key} className={space===key?"active":""} onClick={()=>setSpace(key)}>{label}</button>)}</div></div>;
}
function RecentPaymentsCard({ go }) {
  return <Card><div className="card-head"><div><h2><CircleDollarSign size={18}/>Recent payments</h2><p>Your latest payslips</p></div><button onClick={()=>go("/my-salary")}>View all <ChevronRight size={15}/></button></div>{[["June 2026 payslip","Salary · paid Jul 1 · $588.00","Completed"],["May 2026 payslip","Salary · paid Jun 1 · $563.00","Completed"]].map(([title,sub,status])=><div className="activity-item" key={title}><span><CircleDollarSign size={18}/></span><div><strong>{title}</strong><small>{sub}</small></div><Status>{status}</Status></div>)}</Card>;
}
function MyDocumentsCard({ go }) {
  return <Card><div className="card-head"><div><h2><FileText size={18}/>Documents</h2><p>Shared with you</p></div><button onClick={()=>go("/my-documents")}>View all <ChevronRight size={15}/></button></div>{[["Employment Contract","Contract · 26 Feb 2025","Completed"],["Employee Handbook","Policy · 1 Aug 2026","Active"],["NDA","Legal · 26 Feb 2025","Completed"]].map(([title,sub,status])=><div className="activity-item" key={title}><span><FileText size={18}/></span><div><strong>{title}</strong><small>{sub}</small></div><Status>{status}</Status></div>)}</Card>;
}
function CompanyAnnouncementsCard({ go }) {
  return <Card><div className="card-head"><div><h2><Megaphone size={18}/>Company announcements</h2><p>Latest posts</p></div><button onClick={()=>go("/announcements")}>All posts <ChevronRight size={15}/></button></div>{ANNOUNCEMENTS.slice(0,3).map(([title,audience,author,when,status])=><div className="activity-item" key={title}><span><Megaphone size={18}/></span><div><strong>{title}</strong><small>{audience} · {when}</small></div><Status>{status}</Status></div>)}</Card>;
}
function MyRemindersCard({ go }) {
  return <Card className="attention-card"><div className="card-head"><div><h2><Bell size={18}/>Announcements &amp; Reminders</h2><p>Updates for you</p></div><button onClick={()=>announce("Announcements marked as read")}>Mark all read</button></div>{[["OKRs pending to fill","Complete your objectives","Due Jul 20"],["New leave policy \u2014 Bonus Vacation","Acknowledgement required","Read"],["New teammate joining soon","Welcome them aboard","Soon"],["Q3 all-hands on 20 Aug","All staff \u00b7 2 days away","Soon"]].map(([title,text,cta])=><button className="attention-row" key={title} onClick={()=>go("/announcements")}><span><strong>{title}</strong><small>{text}</small></span><em>{cta}</em></button>)}</Card>;
}
function UpcomingCard() {
  return <Card><div className="card-head"><div><h2><Cake size={18}/>Upcoming</h2><p>Your milestones</p></div></div>{[["Birthday","Mar 14","in 7 months"],["Work anniversary \u00b7 6yr","Jan 11","in 5 months"],["Annual increment","Jan 11","in 5 months"]].map(([title,date,when])=><div className="activity-item" key={title}><span><CalendarDays size={18}/></span><div><strong>{title}</strong><small>{date}</small></div><time>{when}</time></div>)}</Card>;
}
function MySpaceDashboardPanel({ go, role }) {
  return <>
    <div className="metric-grid three employee-metrics">
      <Card className="simple-metric"><span>Latest payslip</span><strong>$588.00</strong><p>June 2026 · 392 hrs</p></Card>
      <Card className="simple-metric"><span>Paid YTD</span><strong>$3,528.00</strong><p>6 payslips</p></Card>
      <Card className="simple-metric"><span>Tenure</span><strong>1y 4m</strong><p>since Feb 26, 2025</p></Card>
    </div>
    <div className="employee-dashboard-grid"><AttentionPanel go={go}/><ActivityCard go={go}/></div>
    <div className="employee-dashboard-grid lower"><RecentPaymentsCard go={go}/><TeamAvailability/></div>
    <div className="employee-dashboard-grid lower"><MyRemindersCard go={go}/><MyDocumentsCard go={go}/></div>
    <div className="employee-dashboard-grid lower"><UpcomingCard/><div><Card className="holiday-card"><small>NEXT PUBLIC HOLIDAY</small><h2>Independence Day</h2><p>Thu, 14 August · office closed</p><span>2 days to go</span></Card><LeaveBalanceCard go={go}/></div></div>
  </>;
}
function DashboardBanner({ go, open, role, space }) {
  const isMust = space === "must";
  return <div className="dash-banner">
    <div className="dash-banner-copy">
      <div className="dash-banner-eyebrow">{(role||"Super Admin").toUpperCase()} · PEOPLE OPERATIONS</div>
      <h1>Good morning, <span>Matilda</span> 👋</h1>
      <p>{isMust ? "Here\u2019s what needs attention across MUST today \u2014 12 August 2026." : "Here\u2019s what needs your attention today \u2014 12 August 2026."}</p>
      <div className="dash-banner-actions">
        {isMust ? <>
          <Button icon={UserPlus} onClick={() => open("employee")}>Add Employee</Button>
          <Button kind="secondary" icon={Megaphone} onClick={() => open("announcement")}>Post Announcement</Button>
          <Button kind="secondary" icon={UserCog} onClick={() => open("user")}>Invite User</Button>
          <Button kind="secondary" icon={BarChart3} onClick={() => go("/reports")}>Run Report</Button>
        </> : <>
          <Button icon={CircleDollarSign} onClick={() => go("/my-salary")}>View payslips</Button>
          <Button kind="secondary" icon={Users} onClick={() => go("/my-team")}>My Team</Button>
        </>}
      </div>
    </div>
    <DashboardIllustration/>
  </div>;
}
function Dashboard({ go, open, role }) {
  const [space, setSpace] = useState("me");
  return <>
    <DashboardBanner go={go} open={open} role={role} space={space}/>
    <SpaceTabs space={space} setSpace={setSpace}/>
    {space === "me" ? <MySpaceDashboardPanel go={go} role={role}/> : <MustSpaceDashboardPanel go={go} open={open} role={role}/>}
  </>;
}

function MustSpaceDashboardPanel({ go, open, role }) {
  const pipMembers = EMPLOYEE_DIRECTORY.filter(e=>e.status==="On PIP");
  const departments = DEPARTMENTS;
  const pendingApprovals = 2 + 3;
  const metrics = [
    ["Open issues",3,"red","1 high priority"],
    ["Pending approvals",pendingApprovals,"amber","2 leave · 3 services"],
    ["Members on PIP",pipMembers.length,pipMembers.length?"amber":"neutral",pipMembers.length?"Review needed":"All clear"],
    ["On leave today",9,"neutral","Across 6 teams"],
    ["Active today",284,"green","99% of workforce"],
    ["Total headcount",287,"neutral","▲ 6 this quarter"],
  ];
  return <>
    <div className="metric-grid">{metrics.map(([label,value,tone,caption]) => <Card className="metric" key={label}><span className="metric-label">{label}</span><strong className={`metric-value ${tone}`}>{value}</strong><small className={`metric-caption ${tone}`}>{caption}</small></Card>)}</div>
    <div className="admin-dashboard-grid lower">
      <Card className="attention-card"><div className="card-head"><div><h2><Bell size={18}/>Needs your action</h2><p>Approvals, reminders and system health</p></div><button onClick={()=>go("/leaves")}>Review all <ChevronRight size={15}/></button></div>{[["2","Leave requests","One request overlaps with a teammate","Review","/leaves"],["3","Employee Services requests","Equipment and document requests","Review","/all-requests"],["1","Reported issue","Employee profile export failed","Open","/settings/platform"],["94","Feedback responses","Open across active cycles","Remind","/feedbacks"],["3","Missing manager","Employees with no reporting line set","Assign","/employees"]].map(([n,title,text,cta,to])=><button className="attention-row" key={title} onClick={()=>go(to)}><b>{n}</b><span><strong>{title}</strong><small>{text}</small></span><em>{cta}</em></button>)}</Card>
      <Card><div className="card-head"><div><h2><Building2 size={18}/>By department</h2></div><button onClick={()=>go("/reports")}>Reports <ChevronRight size={15}/></button></div>{departments.map(([name,value])=><div className="department-bar" key={name}><span>{name}<b>{value}</b></span><i><em style={{width:`${Math.max(8,value/84*100)}%`}}/></i></div>)}</Card>
    </div>
    <div className="admin-dashboard-grid lower">
      <Card><div className="card-head"><div><h2>Team availability</h2><p>Today across MUST</p></div><button onClick={()=>go("/org-chart")}>Org chart <ChevronRight size={15}/></button></div><div className="availability-strip"><div><strong>278</strong><span>Available</span></div><div><strong>9</strong><span>Out today</span></div><div><strong>4</strong><span>Starting soon</span></div></div></Card>
      <CompanyAnnouncementsCard go={go}/>
    </div>
    <div className="admin-dashboard-grid lower">
      <Card><div className="card-head"><div><h2><History size={18}/>Activity</h2><p>Recent actions across the system</p></div><button onClick={()=>go("/activity-logs")}>View all <ChevronRight size={15}/></button></div><div className="people-list">{[0,3,4,5,6].map(i=>ACTIVITY_LOG[i]).map((r,i)=><button key={i} onClick={()=>go("/activity-logs")}><Avatar initials={r[1]} small/><div><strong>{r[2]}</strong><span>{r[4]}</span></div><time>{r[0].split(",")[0]}</time></button>)}</div></Card>
      <Card><div className="card-head"><div><h2><ShieldCheck size={18}/>Members on PIP</h2></div>{pipMembers.length>0&&<button onClick={()=>go("/employees")}>View all <ChevronRight size={15}/></button>}</div>{pipMembers.length?<div className="people-list">{pipMembers.map(e=><button key={e.name} onClick={()=>go(`/employees/${slugify(e.name)}`)}><Avatar initials={e.initials} small/><div><strong>{e.name}</strong><span>{e.title}</span></div></button>)}</div>:<Empty icon={Check} title="Everyone is on track" text="No employees are currently on a PIP."/>}</Card>
    </div>
    <div className="admin-dashboard-grid lower">
      <Card className="recent-card"><div className="card-head"><div><h2><CalendarDays size={19}/>Recently onboarded</h2><p>Newest employees across the company</p></div><button onClick={() => go("/employees")}>View all <ChevronRight size={15}/></button></div><div className="people-list">{employees.slice(1,5).map((e,i) => <button key={e[0]} onClick={() => go("/employees/matilda")}><Avatar initials={e[5]} small/><div><strong>{e[0]}</strong><span>{e[1]} · {e[2]}</span></div><time>{["Aug 8","Aug 4","Jul 29","Jul 22"][i]}<small>2026</small></time></button>)}</div></Card>
      <div><Card><div className="card-head"><div><h2><Cake size={18}/>Upcoming events</h2><p>Birthdays and work anniversaries</p></div></div><div className="people-list"><button onClick={()=>go("/employees")}><Avatar initials="AW" small/><div><strong>Adha Washington</strong><span>Birthday · HR</span></div><time>Aug 14</time></button><button onClick={()=>go("/employees")}><Avatar initials="AQ" small/><div><strong>Abdul Qadir</strong><span>1 year anniversary · BLK</span></div><time>Sep 15</time></button></div></Card><Card className="holiday-card"><small>NEXT PUBLIC HOLIDAY</small><h2>Independence Day</h2><p>Thu, 14 August · office closed</p><span>2 days to go</span></Card></div>
    </div>
  </>;
}

function PermissionDenied({go}) { return <Card className="unlinked-state"><span><LockKeyhole size={25}/></span><h2>You don’t have access to this page</h2><p>Your current role does not include this permission. Switch role preview or return to your dashboard.</p><Button kind="secondary" icon={ArrowLeft} onClick={()=>go("/my-dashboard")}>Back to dashboard</Button></Card> }

const myActivities = [["Annual Leave","12–14 Aug · 3 days","Pending"],["Casual Leave","3 Jul · 1 day","Approved"],["Employment Letter","Requested 18 Jun","Completed"]];
function MySpacePage({path,go,role,open}) {
  const isLead=role==="Team Lead"; const title=routeMeta[path]?.[1]||"My Dashboard";
  if(path==="/my-dashboard") return <><PageTitle className="greeting-title" title={<>Good morning, <span>{isLead?"Ethan":"Matilda"}</span></>} subtitle="Here’s what’s happening at MUST today — 12 August 2026." actions={<Button kind="secondary" icon={FileText} onClick={()=>go("/my-salary")}>View payslip</Button>}/><div className="metric-grid three employee-metrics"><Card className="simple-metric"><span>Hourly rate</span><strong>$1.50</strong><p>per hour</p></Card><Card className="simple-metric"><span>Latest payslip</span><strong>$588.00</strong><p>June 2026 · 392 hrs</p></Card><Card className="simple-metric"><span>Tenure</span><strong>1y 4m</strong><p>since Feb 26, 2025</p></Card></div><div className="employee-dashboard-grid">{isLead?<Card className="attention-card"><div className="card-head"><div><h2><span className="count-badge">2</span>Requests awaiting your approval</h2></div><button onClick={()=>go("/approvals")}>View all <ChevronRight size={15}/></button></div>{[["SG","Sophie Grant","Annual Leave","12–14 Aug · 3 days","2 overlapping teammates"],["FH","Felix Harper","Overtime","14 Aug · 2 hrs",""]].map(([ini,name,type,date,overlap])=><button className="approval-row" key={name} onClick={()=>go("/approvals")}><Avatar initials={ini} small/><span><strong>{name}</strong><small>{type} · {date}</small>{overlap&&<em>{overlap}</em>}</span><b>Review</b></button>)}<div className="active-request"><strong>Your active request</strong><span>Annual Leave · 12–14 Aug</span><Status>Pending</Status></div></Card>:<ActivityCard go={go}/>}<AttentionPanel go={go}/></div><div className="employee-dashboard-grid lower"><TeamAvailability/><div><Card className="holiday-card"><small>NEXT PUBLIC HOLIDAY</small><h2>Independence Day</h2><p>Thu, 14 August · office closed</p><span>2 days to go</span></Card><LeaveBalanceCard go={go}/></div></div></>;
  if(path==="/my-profile") return <RoleProfile role={role} go={go}/>;
  if(path==="/my-salary") return <><PageTitle title="My Salary" subtitle="Payslips and salary history" actions={<Button icon={Download}>Download latest</Button>}/><div className="metric-grid three employee-metrics"><Card className="simple-metric"><span>Latest net pay</span><strong>$588.00</strong><p>June 2026</p></Card><Card className="simple-metric"><span>Hourly rate</span><strong>$1.50</strong><p>effective Feb 2025</p></Card><Card className="simple-metric"><span>Hours</span><strong>392</strong><p>June 2026</p></Card></div><Card><DataTable columns={["Pay period","Hours","Gross","Deductions","Net","Status"]} rows={[["June 2026","392","$628.00","$40.00","$588.00","Completed"],["May 2026","376","$601.00","$38.00","$563.00","Completed"]]} renderActions={()=> <IconButton icon={Download} label="Download payslip"/>}/></Card></>;
  if(path==="/my-documents") return <><PageTitle title="My Documents" subtitle="Documents shared with you"/><Card><DataTable columns={["Document","Category","Shared","Status"]} rows={[["Employment Contract","Contract","26 Feb 2025","Completed"],["Employee Handbook","Policy","1 Aug 2026","Active"],["NDA","Legal","26 Feb 2025","Completed"]]} renderActions={()=> <IconButton icon={Download} label="Download document"/>}/></Card></>;
  if(path==="/my-team") return <><PageTitle title="My Team" subtitle="Your reporting line and team members"/><Card><div className="card-head"><div><h2>BLK-UXI · UX/UI Team</h2><p>2 members · Ismail Gorkem Kara, team lead</p></div></div><div className="people-list">{[["MA","Matilda Ipeh Anashie","Senior Product Designer"],["SG","Sneha Gupta","Product Designer"]].map(([ini,name,job])=><button key={name}><Avatar initials={ini} small/><div><strong>{name}</strong><span>{job}</span></div></button>)}</div></Card></>;
  if(path==="/my-feedbacks") return <><PageTitle title="My Feedback" subtitle="Feedback cycles and responses"/><Card><DataTable columns={["Cycle","Reviewer","Due date","Progress","Status"]} rows={[["Q3 Performance Review","Ismail Gorkem Kara","20 Aug 2026","3 of 5 answers","Pending"],["Probation Review","Sneha Gupta","26 May 2025","5 of 5 answers","Completed"]]} renderActions={(r)=> <Button kind="secondary">{r[4]==="Completed"?"View":"Continue"}</Button>}/></Card></>;
  if(path==="/my-leaves") return <MyLeavesPage open={open}/>;
  if(path==="/requests") return <MyRequestsPage open={open}/>;
  if(path==="/sops") return <><PageTitle title="SOPs & Policies" subtitle="Company standard operating procedures and policies"/><Card><Empty icon={FileText} title="No SOPs published yet" text="Standard operating procedures and policy documents will appear here once published."/></Card></>;
  return <TeamApprovalsPage open={open} role={role} path={path}/>;
}
function ActivityCard({go}) { return <Card><div className="card-head"><div><h2>Latest activity</h2><p>Your most recent requests</p></div><button onClick={()=>go("/my-leaves")}>See all <ChevronRight size={15}/></button></div>{myActivities.slice(0,2).map(([name,date,status])=><div className="activity-item" key={name}><span><CalendarDays size={18}/></span><div><strong>{name}</strong><small>{date}</small></div><Status>{status}</Status></div>)}</Card> }
function AttentionPanel({go}) { return <Card className="attention-card"><div className="card-head"><div><h2><Bell size={18}/>Needs your attention</h2><p>Announcements and reminders</p></div><button onClick={()=>announce("All reminders marked as read")}>Mark all read</button></div>{[["OKRs pending to fill","Complete your objectives","Due Jul 20"],["New document to sign","Awaiting your signature","Sign"],["Give peers feedback","Take a moment for your team","Feedback"]].map(([title,text,cta])=><button className="attention-row" key={title}><span><strong>{title}</strong><small>{text}</small></span><em>{cta}</em></button>)}</Card> }
function TeamAvailability(){ return <Card><div className="card-head"><div><h2>Who’s out</h2><p>Your team, this week</p></div><button>Team calendar</button></div><div className="week-strip">{[["Mon","10"],["Tue","11"],["Wed","12"],["Thu","13"],["Fri","14"]].map(([day,date])=><span className={day==="Wed"?"active":""} key={day}><small>{day}</small><strong>{date}</strong></span>)}</div><div className="people-list">{[["SG","Sophie Grant","Annual · 12–14 Aug"],["FH","Felix Harper","Sick · Today"],["AM","Adam Mercer","WFH · Today"]].map(([ini,name,note])=><button key={name}><Avatar initials={ini} small/><div><strong>{name}</strong><span>{note}</span></div></button>)}</div></Card> }
function LeaveBalanceCard({go}) { return <Card className="leave-balance-card"><div className="card-head"><h2><CalendarDays size={19}/>Annual Leave</h2><button onClick={()=>go?.("/my-leaves")}><ChevronRight size={16}/></button></div><div className="leave-summary"><strong>7</strong><span>days left<br/>of 15 days</span><b>47% available</b></div><div className="progress"><i/></div></Card> }

function ProfileField({icon:Icon,label,value}) { return <div className="self-profile-field"><span><Icon size={18}/></span><div><small>{label}</small><strong>{value}</strong></div></div>; }
function RoleProfile({role,go}) {
  const person=roleProfile(role); const isLead=role==="Team Lead";
  return <div className="self-profile">
    <PageTitle title={`Welcome, ${person.name.split(" ")[0]}`} subtitle="Your personal information" actions={<Button kind="secondary" icon={Edit3} onClick={()=>announce("Profile change request opened")}>Request a change</Button>}/>
    <Card className="self-profile-hero"><Avatar initials={person.initials}/><div><h1>{person.name}</h1><p>{person.title} · Blockchain Dp.</p><span><Status>Active</Status><b>{isLead?"Team Lead":"Regular"}</b></span></div></Card>
    <Card className="self-profile-section"><h2>Personal information</h2><div className="self-profile-grid"><ProfileField icon={Mail} label="Email" value={person.email}/><ProfileField icon={Phone} label="Phone" value={person.phone}/><ProfileField icon={Building2} label="Department" value="Blockchain Dp."/><ProfileField icon={BriefcaseBusiness} label="Company entity" value="MUST SG"/><ProfileField icon={BriefcaseBusiness} label="Designation" value={person.title}/><ProfileField icon={CalendarDays} label="Joining date" value={person.start}/><ProfileField icon={Clock3} label="Tenure" value={person.tenure}/><ProfileField icon={Globe2} label="Time zone" value="17:00 ~ 02:00 (KST)"/></div><div className="skill-list"><small>Tech stack</small><div>{["Maze","Visual Studio Code","GitHub","Adobe Illustrator","Rive","Figma"].map(x=><span key={x}>{x}</span>)}</div></div></Card>
    <Card className="self-profile-section"><h2>Emergency contact & address</h2><div className="self-profile-grid"><ProfileField icon={IdCard} label="Emergency contact" value="Mildred Anashie"/><ProfileField icon={Phone} label="Emergency phone" value="+234 814 350 9138"/><ProfileField icon={MapPin} label="City" value="FCT Abuja"/><ProfileField icon={Globe2} label="Country" value="Nigeria"/><ProfileField icon={MapPin} label="Address" value="FCT Abuja, Nigeria"/></div></Card>
    <Card className="self-profile-section"><h2>Team & reporting</h2><div className="reporting-copy"><span>Department & team</span><strong>Blockchain Dp. <ChevronRight size={14}/> UX/UI Team <b>BLK-UXI</b></strong></div><ProfileField icon={Users} label="Reports to" value={person.manager}/>{isLead&&<button className="profile-team-link" onClick={()=>go("/my-team")}>View your team <ChevronRight size={15}/></button>}</Card>
    <Card className="self-profile-section"><div className="card-head"><h2>Leave balances · 2026</h2><button onClick={()=>go("/my-leaves")}>View leave history <ChevronRight size={15}/></button></div><div className="profile-balance-grid">{[["Annual Leave","7","15","47%"],["Family Leave","5","5","100%"],["Vacation Leave","3","3","100%"],["Tenure Leave","1","5","20%"]].map(([name,left,total,pct])=><div key={name}><strong>{name}</strong><p><b>{left}</b> / {total} days left</p><i><em style={{width:pct}}/></i></div>)}</div></Card>
    <div className="self-profile-split"><Card className="self-profile-section"><h2>ID & passport</h2><Empty icon={IdCard} title="No identity documents" text="Nothing has been recorded yet."/></Card><Card className="self-profile-section"><h2>Education</h2><Empty icon={GraduationCap} title="No education records" text="Nothing has been added yet."/></Card></div>
    <Card className="self-profile-section"><div className="card-head"><div><h2><Landmark size={18}/>Bank details</h2><p>Recipient information — must match the bank’s records.</p></div><button onClick={()=>announce("Bank detail change request opened")}><Edit3 size={14}/>Request change</button></div><Info rows={[["Bank name","Guaranty Trust Bank (GTB) PLC"],["Account number","•••• •••• 4634"],["Account type","Single sole owner"],["Branch","Lagos, Nigeria"],["SWIFT code","GTBINGLAXXX"],["Account holder","Anashie Matilda Ipeh"]]}/></Card>
    <Card className="self-profile-section"><h2>Assigned assets</h2><Empty icon={PackagePlus} title="No assets issued to you" text="No assignment history yet."/></Card>
  </div>;
}

// Employee self-service leave list — one card per request with type, status, exact time window,
// timezone, hours, reason, current stage, attachment indicator and status-driven recovery actions.
function MyLeavesPage({open}) {
  const [rows,setRows]=useState(MY_LEAVES);
  const [tab,setTab]=useState("All Leaves");
  const cancel=(rec)=>setRows(rows.map(r=>r.id===rec.id?{...r,status:"Cancelled",stage:"Done",progress:null,history:[...r.history,{label:"Cancelled",detail:"by Matilda Ipeh Anashie",time:"Just now",tone:"cancelled"}]}:r)) || announce(`${rec.type} request cancelled`);
  const pendingCount=rows.filter(r=>r.status==="Pending").length;
  const visible=rows.filter(r=>tab==="All Leaves"||(tab==="Completed"?r.status!=="Pending":r.status==="Pending"));
  return <>
    <PageTitle title="My Leaves" subtitle="Apply for leave and track your requests" actions={<Button icon={Plus} onClick={()=>open("apply-leave")}>Apply for Leave</Button>}/>
    <LeaveBalanceCard/>
    <div className="tabs-scroll"><div className="tabs pill-tabs">{["Pending","Completed","All Leaves"].map(x=><button key={x} className={tab===x?"active":""} onClick={()=>setTab(x)}>{x}<span>{x==="Pending"?pendingCount:x==="Completed"?rows.length-pendingCount:rows.length}</span></button>)}</div></div>
    <Card>{visible.length?<div className="leave-card-list">{visible.map(d=><div className="record-card" key={d.id}>
      <div className="record-card-head"><h3><i className={`tone-dot ${d.tone}`}/>{d.type}</h3><Status>{d.status}</Status></div>
      <div className="record-card-meta">
        <span><CalendarDays size={13}/>{d.dates}</span>
        <span><Clock3 size={13}/>{d.time} · {d.timezone}</span>
        <span className="meta-strong">{d.hours}</span>
      </div>
      <div className="record-card-submeta">
        <span>Submitted {d.submitted}</span>
        <span>{d.manager}</span>
        {!!d.attachments && <span><FileText size={13}/>{d.attachments} file{d.attachments>1?"s":""}</span>}
      </div>
      <div className="record-card-reason"><span>Reason</span><p>{d.reason}</p></div>
      <div className="record-card-foot">
        <small>{statusFootNote(d)}</small>
        <div className="row-actions">
          <Button kind="secondary" icon={Eye} onClick={()=>open("leave-detail",d)}>View</Button>
          {d.status==="Pending" && <Button kind="danger" icon={X} onClick={()=>cancel(d)}>Cancel</Button>}
          {d.status==="Rejected" && <Button icon={RotateCcw} onClick={()=>{announce("Reapplying with previous details prefilled");open("apply-leave")}}>Fix & reapply</Button>}
          {(d.status==="Cancelled"||d.status==="Expired") && <Button icon={RotateCcw} onClick={()=>{announce("Reapplying with previous details prefilled");open("apply-leave")}}>Reapply</Button>}
        </div>
      </div>
    </div>)}</div>:<Empty icon={CalendarDays} title="No Leave Requests" text={`You have no ${tab.toLowerCase()} leave requests.`}/>}</Card>
  </>;
}

// Employee self-service HRM request list — mirrors MyLeavesPage's card treatment.
function MyRequestsPage({open}) {
  const [rows,setRows]=useState(MY_REQUESTS);
  const cancel=(rec)=>setRows(rows.map(r=>r.id===rec.id?{...r,status:"Cancelled",stage:"Done",progress:null,history:[...r.history,{label:"Cancelled",detail:"by Matilda Ipeh Anashie",time:"Just now",tone:"cancelled"}]}:r)) || announce(`${rec.type} cancelled`);
  return <>
    <PageTitle title="My Requests" subtitle="Apply for time off, overtime, and more — all in one place" actions={<Button icon={Plus} onClick={()=>open("new-request")}>New Request</Button>}/>
    <Card>{rows.length?<div className="request-card-list">{rows.map(d=><div className="record-card" key={d.id}>
      <div className="record-card-head"><h3>{d.type}</h3><Status>{d.status}</Status></div>
      <div className="record-card-submeta">
        <span>Submitted {d.submitted}</span>
        <span>{d.manager!=="—"?d.manager:d.approvalChain}</span>
        {!!d.attachments && <span><FileText size={13}/>{d.attachments} file{d.attachments>1?"s":""}</span>}
      </div>
      <div className="record-card-reason"><span>Summary</span><p>{d.summary}</p></div>
      <div className="record-card-foot">
        <small>{statusFootNote(d)}</small>
        <div className="row-actions">
          <Button kind="secondary" icon={Eye} onClick={()=>open("request-detail",d)}>View</Button>
          {d.status==="Pending" && <Button kind="danger" icon={X} onClick={()=>cancel(d)}>Cancel</Button>}
          {d.status==="Rejected" && <Button icon={RotateCcw} onClick={()=>{announce("Reapplying with previous details prefilled");open("new-request")}}>Fix & reapply</Button>}
          {(d.status==="Cancelled"||d.status==="Expired") && <Button icon={RotateCcw} onClick={()=>{announce("Reapplying with previous details prefilled");open("new-request")}}>Reapply</Button>}
        </div>
      </div>
    </div>)}</div>:<Empty icon={ClipboardCheck} title="No Requests Yet" text="Submit your first request using the button above."/>}</Card>
  </>;
}

// Team-lead approvals: awaiting-decision queue (with live Approve/Reject and full context) plus a
// decision-history tab, covering both leave and HRM requests reporting to the previewed lead.
function TeamApprovalsPage({open,role,path}) {
  const [tab,setTab]=useState(path==="/decision-history"?"Decision history":"Awaiting decision");
  const [leaves,setLeaves]=useState(()=>LEAVE_REQUESTS.filter(d=>d.manager==="Matilda Ipeh Anashie"));
  const [requests,setRequests]=useState(()=>REQUESTS.filter(d=>d.manager==="Matilda Ipeh Anashie"));
  const decide=(kind,rec,status)=>{
    const bump=(list,setList)=>setList(list.map(item=>item.id!==rec.id?item:{...item,status,stage:"Done",
      progress:item.progress?item.progress.map(s=>s.tone==="pending"?{...s,tone:status==="Approved"?"done":"rejected"}:s):item.progress,
      history:[...item.history,{label:status,detail:"by Matilda Ipeh Anashie",time:"Just now",tone:status==="Approved"?"done":"rejected"}]}));
    kind==="leave"?bump(leaves,setLeaves):bump(requests,setRequests);
    announce(`${rec.employee}'s ${rec.type} ${status.toLowerCase()} and added to decision history`);
  };
  const combined=[...leaves.map(d=>({...d,kind:"leave"})),...requests.map(d=>({...d,kind:"request"}))];
  const visible=combined.filter(d=>tab==="Awaiting decision"?d.status==="Pending":d.status!=="Pending");
  const pendingCount=combined.filter(d=>d.status==="Pending").length;
  return <>
    <PageTitle title="Approvals" subtitle="Requests awaiting your decision and your decision history"/>
    <div className="tabs pill-tabs">{["Awaiting decision","Decision history"].map(x=><button key={x} className={tab===x?"active":""} onClick={()=>setTab(x)}>{x}{x==="Awaiting decision"&&<span>{pendingCount}</span>}</button>)}</div>
    <Card>{visible.length?<div className="leave-card-list">{visible.map(d=><div className="record-card" key={d.id}>
      <div className="record-card-head"><h3><Avatar initials={d.initials} small/>{d.employee}</h3><Status>{d.status}</Status></div>
      <div className="record-card-meta">
        <span>{d.team}{d.teamCode?` · ${d.teamCode}`:""}</span>
        <span className="meta-strong">{d.type}</span>
        <span>{d.kind==="leave"?`${d.dates} · ${d.hours}`:d.summary}</span>
      </div>
      <div className="record-card-submeta">
        <span>Submitted {d.submitted}</span>
        {d.kind==="leave" && d.overlap && <span className="detail-flag warn"><AlertTriangle size={12}/>{d.overlap}</span>}
        {!!d.attachments && <span><FileText size={13}/>{d.attachments} file{d.attachments>1?"s":""}</span>}
      </div>
      <div className="record-card-reason"><span>Reason</span><p>{d.kind==="leave"?d.reason:d.answers[0][1]}</p></div>
      <div className="record-card-foot">
        <small>{statusFootNote(d)}</small>
        <div className="row-actions">
          <Button kind="secondary" icon={Eye} onClick={()=>open(d.kind==="leave"?"leave-detail":"request-detail",d)}>Review</Button>
          {d.status==="Pending" && <><IconButton icon={Check} label="Approve" success onClick={()=>decide(d.kind,d,"Approved")}/><IconButton icon={X} label="Reject" danger onClick={()=>decide(d.kind,d,"Rejected")}/></>}
        </div>
      </div>
    </div>)}</div>:<Empty icon={ClipboardCheck} title={tab==="Awaiting decision"?"Nothing waiting on you":"No decisions yet"} text={tab==="Awaiting decision"?"You're all caught up — new requests will appear here.":"Approved and rejected requests will appear here."}/>}</Card>
  </>;
}

function EmployeesPage({ go, open }) {
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
  return <><PageTitle className="employee-title" title="Employee Directory" subtitle={`Showing ${visible.length} of ${directory.length} employees`} actions={<><Button kind="secondary" icon={Download}>Export Excel</Button><Button icon={Plus} onClick={()=>open("employee")}>Add Employee</Button></>}/><div className="employee-toolbar"><SearchBox placeholder="Search by name, email, or department…" value={q} onChange={setQ}/><Select value={department} onChange={setDepartment}><option>All Departments</option>{["AGN","BIC","BLK","CEO","FIN","HQ","HR","MNC","UNASSIGNED","VP"].map(x=><option key={x}>{x}</option>)}</Select><Select value={team} onChange={setTeam}><option>All Teams</option>{teamNames.map(x=><option key={x}>{x}</option>)}</Select><Select value={country} onChange={setCountry}><option>All Countries</option>{countries.map(x=><option key={x}>{x}</option>)}</Select><div className="view-switch"><button className={view==="grid"?"active":""} onClick={()=>setView("grid")}><LayoutDashboard size={15}/>Grid</button><button className={view==="table"?"active":""} onClick={()=>setView("table")}><ListChecks size={15}/>Table</button></div></div><div className="tabs-scroll"><div className="tabs pill-tabs">{statuses.map(x=><button key={x} className={status===x?"active":""} onClick={()=>setStatus(x)}>{x}</button>)}</div></div>{!visible.length?<Card><Empty icon={Users} title={`No ${status.toLowerCase()} employees`} text={q?"No employee matches your search.":`Employees with ${status.toLowerCase()} status will appear here.`}/></Card>:view==="grid"?<div className="employee-card-grid">{visible.map((e,i)=><button className="employee-directory-card" key={e.name} onClick={()=>go(`/employees/${slugify(e.name)}`)}><div className="employee-card-person"><Avatar initials={e.initials}/><div><h3>{e.name}</h3><p>{e.title}</p></div></div><Status>{e.status||"Active"}</Status><div className="employee-card-meta"><span><Building2 size={13}/>{e.department}</span><span><CalendarDays size={13}/>{e.joined}</span><strong>$ <b>{hourlyRate(e.name)}/hr</b></strong></div></button>)}</div>:<div className="employee-compact-table"><table><thead><tr>{["Employee","Role","Dept","Joined","Rate","Status"].map(x=><th key={x}>{x}</th>)}</tr></thead><tbody>{visible.map(e=><tr key={e.name} onClick={()=>go(`/employees/${slugify(e.name)}`)}><td><span className="employee-cell"><Avatar initials={e.initials} small/><strong>{e.name}</strong></span></td><td>{e.title}</td><td>{e.department}</td><td>{e.joined}</td><td className="rate-cell">${hourlyRate(e.name)}/hr</td><td><Status>{e.status||"Active"}</Status></td></tr>)}</tbody></table></div>}</>;
}

const employeeTabs = [["overview","Overview",Users],["documents","Documents",FileText],["education","Education",GraduationCap],["identity","ID & Passport",IdCard],["notes","HR Notes",NotebookPen],["pip","PIP",AlertTriangle],["ida","IDA",ShieldCheck],["salary","Salary",CircleDollarSign],["leaves","Leaves",CalendarDays],["hours","Working Hours",Clock3],["bank","Bank Details",WalletCards],["assets","Assets",Boxes],["history","Edit History",History]];
function slugify(name) { return name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""); }

function EmployeePage({ go, open, path }) {
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
    overview: <div className="detail-grid"><Card><h2>Personal information</h2><Info rows={[["Work email",person.email],["Phone",person.phone],["Date of birth",person.dob]]}/></Card>{!found&&<Card><h2>Emergency contact</h2><Info rows={[["Name","Elizabeth Anashie"],["Relationship","Sister"],["Phone","+233 20 000 0000"]]}/></Card>}</div>,
    documents: <RecordSection title="Documents" text="Contracts, certificates and other employee files" action="Upload Document" onAction={()=>open("document")} empty="No documents uploaded"/>,
    education: <RecordSection title="Education" text="Qualifications and education history" action="Add Qualification" onAction={()=>open("qualification")} rows={[["BSc. Communication Design","Kwame Nkrumah University","2013 – 2017","Verified"]]}/>,
    identity: <RecordSection title="ID & Passport" text="Identity documents and expiry details" action="Add Document" onAction={()=>open("identity")} rows={[["Ghana Card","GHA-000000000-0","Expires Jan 14, 2030","Active"]]}/>,
    notes: <RecordSection title="HR Notes" text="Private employee notes and records" action="Add HR Note" onAction={()=>open("note")} rows={[["General note","Career development discussion","Aug 8, 2026","Active"]]}/>,
    pip: <RecordSection title="Performance Improvement Plans" text="Track performance improvement activity" action="Start PIP" onAction={()=>open("pip")} empty="No PIP records"/>,
    ida: <RecordSection title="Internal Disciplinary Actions" text="Track disciplinary actions" action="Start IDA" onAction={()=>open("ida")} empty="No disciplinary actions"/>,
    salary: <RecordSection title="Salary Records" text="Compensation and deduction history" action="Add Salary Record" onAction={()=>open("salary")} rows={[["Aug 2026","$24,000","$3,840 deductions","$20,160 net"]]}/>,
    leaves: <LeaveBalances compact/>,
    hours: <WorkingHours/>,
    bank: <Card><div className="card-head"><div><h2><LockKeyhole size={18}/>Bank Details</h2><p>Payment account information</p></div><Button icon={Edit3} onClick={()=>open("bank")}>Edit details</Button></div><Info rows={[["Account name",person.name],["Bank","Ecobank Ghana"],["Account number","•••• •••• 4912"],["SWIFT / BIC","ECOCGHAC"],["Status","Locked"]]}/></Card>,
    assets: <RecordSection title="Assigned Assets" text="Company property assigned to this employee" action="Assign Asset" onAction={()=>open("asset")} rows={[["MacBook Pro 14\"","MUST-LT-0142","Assigned Mar 14, 2024","Assigned"]]}/>,
    history: <RecordSection title="Edit History" text="Changes made to this employee record" rows={[["Job title updated","Senior Product Designer","Sneha Gupta","Aug 2, 2026"],["Bank details locked","Security policy","Arshman Afzal","Jul 17, 2026"]]}/>,
  };
  return <><button className="back-link" onClick={()=>go("/employees")}><ArrowLeft size={16}/>Back to employees</button>
  <Card className="phero">
    <div className="phero-cover"/>
    <div className="phero-top">
      <span className="avatar-lg" style={{background:avatarColor(person.initials)}}>{person.initials}</span>
      <div className="phero-id">
        <div className="phero-name-row"><h1>{person.name}</h1><Status>{person.status}</Status></div>
        <p className="phero-role">{person.title}</p>
        <span className="phero-email">{person.email}</span>
      </div>
      <div className="phero-actions">
        <Button kind="secondary" icon={Edit3} onClick={()=>open("employee")}>Edit</Button>
        <Button kind="secondary" icon={UserMinus} onClick={()=>open("terminate")}>Terminate</Button>
        <Button kind="danger" icon={Trash2} onClick={()=>open("delete")}>Delete</Button>
      </div>
    </div>
    <div className="phero-stats">
      <div className="pstat"><div className="k">Department</div><div className="v">{person.department}</div></div>
      <div className="pstat"><div className="k">Team</div><div className="v">{person.team}</div></div>
      <div className="pstat"><div className="k">Reports to</div><div className="v">{person.manager}</div></div>
      <div className="pstat"><div className="k">Start date</div><div className="v">{person.joined}</div></div>
    </div>
  </Card>
  <div className="tabs-scroll"><div className="tabs line-tabs">{employeeTabs.map(([id,label,Icon])=><button key={id} className={tab===id?"active":""} onClick={()=>setTab(id)}><Icon size={16}/>{label}</button>)}</div></div>{tabContent[tab]}</>;
}

function Info({rows}) { return <dl className="info-list">{rows.map(([a,b])=><div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl>; }
function RecordSection({title,text,action,onAction,rows,empty}) { return <Card><div className="card-head"><div><h2>{title}</h2><p>{text}</p></div>{action&&<Button icon={Plus} onClick={onAction}>{action}</Button>}</div>{rows ? <DataTable columns={["Record","Details","Date","Status"]} rows={rows}/> : <Empty title={empty} text="Records added here will appear in this section." action={action&&<Button icon={Plus} onClick={onAction}>{action}</Button>}/>}</Card>; }
function LeaveBalances({compact=false}) { const rows=[["Annual Leave","15 days","7 days","8 days"],["Sick Leave","10 days","1 day","9 days"],["Compassionate Leave","5 days","0 days","5 days"]]; return <Card><div className="card-head"><div><h2>Leave Balances</h2><p>Current entitlement and usage</p></div></div><DataTable columns={["Leave type","Allowance","Used","Remaining"]} rows={rows}/>{!compact&&<p className="helper">Balances include approved requests for the 2026 leave year.</p>}</Card>; }
function WorkingHours(){ const [mode,setMode]=useState("Monthly"); return <Card><div className="card-head"><div><h2>Working Hours</h2><p>August 2026 attendance summary</p></div><div className="segmented"><button className={mode==="Monthly"?"active":""} onClick={()=>setMode("Monthly")}>Monthly</button><button className={mode==="Daily"?"active":""} onClick={()=>setMode("Daily")}>Daily</button></div></div>{mode==="Monthly"?<div className="hours-grid">{[["Days worked","8"],["Total hours","61h 24m"],["Average / day","7h 41m"],["Late arrivals","1"]].map(x=><div key={x[0]}><span>{x[0]}</span><strong>{x[1]}</strong></div>)}</div>:<DataTable columns={["Date","Clock in","Clock out","Duration","Status"]} rows={[["Aug 11, 2026","08:57","17:18","8h 21m","Completed"],["Aug 10, 2026","09:12","17:05","7h 53m","Completed"]]}/>}</Card> }

function TeamCard({team,go}) { return <button className="live-team-card" onClick={()=>go(`/teams/${team.index}`)}><span className="team-topline"/><span className="live-team-icon"><Users size={22}/></span><ChevronRight className="team-arrow" size={17}/><h3>{team.name}</h3><span className="team-code">{team.code}</span><span className="team-spacer"/><div className="team-card-foot"><div className="avatar-stack">{team.avatars.map((a,i)=><span key={`${a}-${i}`} className={a.startsWith("+")?"more":""} style={a.startsWith("+")?undefined:{background:avatarColor(a)}}>{a}</span>)}</div><span className="member-count">{team.count} {team.count===1?"member":"members"}</span>{team.leader!=="—"?<strong><Crown size={13}/>{team.leader}</strong>:<span className="no-leader">No leader assigned</span>}</div></button> }

function TeamsPage({go,open}) { const [q,setQ]=useState(""); const list=teams.filter(t=>`${t.name} ${t.code} ${t.leader}`.toLowerCase().includes(q.toLowerCase())); return <><PageTitle title="Teams" subtitle={`${list.length} teams`} actions={<Button icon={Plus} onClick={()=>open("team")}>Create Team</Button>}/><div className="team-search"><SearchBox placeholder="Search by team name, description, leader, or member…" value={q} onChange={setQ}/></div>{list.length?<div className="live-team-grid">{list.map(team=><TeamCard key={`${team.code}-${team.index}`} team={team} go={go}/>)}</div>:<Empty icon={Users} title="No teams found" text="No team matches this search."/>}</> }

function MemberRow({name,initials,leader=false,reports,role}) { return <div className="live-member-row"><Avatar initials={initials} small/><div className="member-copy"><div><strong>{name}</strong>{leader&&<span className="leader-badge"><Crown size={11}/>Leader</span>}<Status>Active</Status></div><p>{role||"Team member"}</p></div><div className="reports-to"><span>REPORTS TO</span><button onClick={()=>announce(`Reporting line editor opened for ${name}`)}>{reports||"None"}<ChevronDown size={14}/></button></div><IconButton icon={UserMinus} label="Remove from team" onClick={()=>announce(`${name} removed from the team`)}/></div> }

function TeamDetail({go,open,path}) { const idx=Number(path.split("/").pop()); const team=teams[Number.isFinite(idx)?idx:75]||teams[75]; const isUX=team.code==="BLK-UXI"; return <><button className="back-link live-back" onClick={()=>go("/teams")}><ArrowLeft size={16}/>Back to Teams</button><Card className="team-detail-hero"><span className="team-detail-line"/><span className="live-team-icon large"><Users size={26}/></span><div className="team-detail-copy"><small>{team.code.split("-")[0]}</small><div><h1>{team.name}</h1><span className="team-code">{team.code}</span></div><p>{team.count} {team.count===1?"member":"members"} {team.leader!=="—"?<strong><Crown size={14}/>{team.leader}</strong>:<span className="no-leader">No leader assigned</span>}</p></div><div className="team-detail-actions"><Button kind="secondary" icon={Edit3} onClick={()=>open("team")}>Edit</Button><Button kind="secondary" icon={Trash2} onClick={()=>open("team-delete")}>Delete</Button></div></Card><Card className="team-members-card"><div className="card-head"><h2>Team Members</h2><Button icon={UserPlus} onClick={()=>open("member")}>Add Member</Button></div>{isUX?<><MemberRow name="Sneha Gupta" initials="SG" role="Product Designer · BLK" reports={team.leader!=="—"?team.leader:undefined}/><MemberRow name="Matilda Ipeh Anashie" initials="MI" leader role="Product Designer · BLK" reports="Lion Cho Chung Hyun"/></>:<>{team.avatars.filter(a=>!a.startsWith("+")).map((a,i)=>{const isLeader=i===0&&team.leader!=="—";return <MemberRow key={`${a}-${i}`} name={isLeader?team.leader:`Team member ${i+1}`} initials={a} leader={isLeader} role={`${team.code.split("-")[0]} team`} reports={!isLeader&&team.leader!=="—"?team.leader:undefined}/>})}</>}</Card></> }

function LeavesPage({open}) {
  const [tab,setTab]=useState("Pending"); const [state,setState]=useState("Data"); const [allRows,setAllRows]=useState(LEAVE_REQUESTS);
  const [selected,setSelected]=useState(()=>new Set());
  const decide=(recs,status)=>{const ids=new Set(recs.map(r=>r.id));setAllRows(allRows.map(item=>!ids.has(item.id)?item:{...item,status,stage:"Done",
    progress:item.progress?item.progress.map(s=>s.tone==="pending"?{...s,tone:status==="Approved"?"done":"rejected"}:s):item.progress,
    history:[...item.history,{label:status,detail:"by Admin",time:"Just now",tone:status==="Approved"?"done":"rejected"}]}));
    announce(recs.length>1?`${recs.length} leave requests ${status.toLowerCase()} and added to decision history`:`${recs[0].employee}'s leave ${status.toLowerCase()} and added to decision history`);setSelected(new Set())};
  let rows=allRows.filter(r=>tab==="All Requests" || (tab==="Completed" ? r.status!=="Pending" : r.status==="Pending"));
  const pending=allRows.filter(r=>r.status==="Pending").length;
  const cells=rows.map(d=>[d.employee,d.team,d.type,d.dates,d.hours,d.overlap?"Overlap":d.attachments?`${d.attachments} file${d.attachments>1?"s":""}`:"—",d.status]);
  const toggleOne=(id)=>setSelected(prev=>{const next=new Set(prev);next.has(id)?next.delete(id):next.add(id);return next});
  const toggleAll=()=>setSelected(prev=>prev.size===rows.length?new Set():new Set(rows.map(r=>r.id)));
  return <><PageTitle className="leave-page-title" title="Leave Management" subtitle="Review and manage employee leave requests" actions={<><Button kind="secondary" icon={CalendarDays}>Leave Sheet</Button><Button icon={Plus} onClick={()=>open("leave")}>Apply for Employee</Button></>}/><div className="tabs-scroll"><div className="tabs pill-tabs">{["Pending","Completed","All Requests"].map(x=><button key={x} className={tab===x?"active":""} onClick={()=>{setTab(x);setSelected(new Set())}}>{x}<span>{x==="Pending"?pending:x==="Completed"?allRows.length-pending:allRows.length}</span></button>)}</div></div><Card><Toolbar><SearchBox placeholder="Search employee"/><Select><option>All leave types</option><option>Annual Leave</option><option>Sick Leave</option></Select><Select value={state} onChange={setState}><option>Data</option><option>Empty</option><option>Loading error</option></Select><Button kind="secondary" icon={Filter}>Filters</Button></Toolbar>{tab==="Pending"&&selected.size>0&&<div className="bulk-action-bar"><strong>{selected.size} selected</strong><Button icon={Check} onClick={()=>decide(rows.filter(r=>selected.has(r.id)),"Approved")}>Approve</Button><Button kind="danger" icon={X} onClick={()=>decide(rows.filter(r=>selected.has(r.id)),"Rejected")}>Reject</Button><button className="bulk-clear" onClick={()=>setSelected(new Set())}>Clear</button></div>}{state==="Loading error"?<ErrorState message="The leave request service returned an unexpected database response."/>:state==="Empty"?<Empty title="No leave requests" text={`There are no ${tab.toLowerCase()} leave requests.`}/>:<DataTable columns={["Employee","Team","Leave type","Dates","Hours","Flags","Status"]} rows={cells} selectable={tab==="Pending"} selected={selected} onToggle={toggleOne} onToggleAll={toggleAll} getKey={(row,i)=>rows[i].id} renderActions={(r,i)=>{const rec=rows[i]; return <div className="row-actions"><IconButton icon={Eye} label="View request" onClick={()=>open("leave-detail",rec)}/>{rec.status==="Pending"&&<><IconButton icon={Check} label="Approve" success onClick={()=>decide([rec],"Approved")}/><IconButton icon={X} label="Reject" danger onClick={()=>decide([rec],"Rejected")}/></>}</div>}}/>}</Card></> }

function leaveSeed(str) { let h=0; for(let i=0;i<str.length;i++) h=(h*31+str.charCodeAt(i))>>>0; return h; }
function leaveBalanceRows() {
  const rows=[];
  employees.forEach(e => {
    LEAVE_TYPES.forEach(t => {
      const m=/(\d+)h/.exec(t.entitlement);
      if (m) {
        const total=parseInt(m[1],10);
        const seed=leaveSeed(e[0]+t.key);
        const used=Math.min(total,Math.round((total*(seed%101)/100)/4)*4);
        const pending=(seed%5===0)?Math.min(8,total-used):0;
        const balance=Math.max(0,total-used-pending);
        rows.push([e[0],t.name,`${total}h`,`${used}h`,`${pending}h`,`${balance}h`]);
      } else {
        rows.push([e[0],t.name,"Unlimited","—","—","Unlimited"]);
      }
    });
  });
  return rows;
}
function LeaveBalancesPage({open}) { return <><PageTitle title="Leave Balances" subtitle="View and adjust employee leave balances" actions={<Button kind="secondary" icon={Download}>Export Balances</Button>}/><Card><Toolbar><SearchBox placeholder="Search employees"/><Select><option>All entities</option><option>MUST Company Ghana</option></Select><Select><option>2026</option><option>2025</option></Select><Select><option>All leave types</option>{LEAVE_TYPES.map(t=><option key={t.key}>{t.name}</option>)}</Select></Toolbar><DataTable columns={["Employee","Leave type","Allowance","Used","Pending","Balance"]} rows={leaveBalanceRows()} renderActions={()=> <IconButton icon={Edit3} label="Edit balance" onClick={()=>open("balance")}/>} /></Card></> }

function RequestsPage({open}) {
  const [state,setState]=useState("Data");
  const cells=REQUESTS.map(d=>[d.employee,d.team,d.type,d.summary,d.submitted,d.status]);
  return <><PageTitle title="All Employee Services Requests" subtitle="Track and manage employee requests"/><Card><Toolbar><SearchBox placeholder="Search requests"/><Select><option>All request types</option>{REQUEST_TYPES.map(t=><option key={t.key}>{t.name}</option>)}</Select><Select><option>All statuses</option><option>Pending</option><option>Approved</option><option>Rejected</option><option>Cancelled</option><option>Expired</option></Select><Select value={state} onChange={setState}><option>Data</option><option>Empty</option><option>Loading error</option></Select></Toolbar>{state==="Loading error"?<ErrorState message="Requests could not be loaded because the service response is incomplete."/>:state==="Empty"?<Empty title="No Employee Services requests" text="No requests match the selected filters."/>:<DataTable columns={["Employee","Team","Request type","Details","Submitted","Status"]} rows={cells} renderActions={(r,i)=> <IconButton icon={Eye} label="View request" onClick={()=>open("request-detail",REQUESTS[i])}/>} />}</Card></> }

function AssetsPage({open}) {
  const [state,setState]=useState("Data");
  const [rows,setRows]=useState([["MacBook Pro 14\"","Laptop","MUST-LT-0142","Matilda Ipeh Anashie","Assigned"],["Dell Latitude 7440","Laptop","MUST-LT-0188","—","Available"],["iPhone 15 Pro","Mobile Phone","MUST-PH-0041","Ismail Gorkem Kara","Assigned"],["Samsung 27\" Monitor","Monitor","MUST-MN-0097","—","Available"]]);
  const toggleStatus=(i)=>setRows(rows.map((r,idx)=>{if(idx!==i)return r;const next=r[4]==="Assigned"?"Available":"Assigned";announce(`${r[0]} marked ${next}`);return [r[0],r[1],r[2],r[3],next];}));
  const deleteRow=(i)=>{announce(`${rows[i][0]} removed from asset inventory`);setRows(rows.filter((_,idx)=>idx!==i))};
  return <><PageTitle title="Assets" subtitle="Manage company assets and assignments" actions={<Button icon={PackagePlus} onClick={()=>open("asset")}>Add Asset</Button>}/><Card><Toolbar><SearchBox placeholder="Search assets"/><Select><option>All asset types</option><option>Laptop</option><option>Mobile Phone</option></Select><Select><option>All statuses</option><option>Available</option><option>Assigned</option></Select><Select value={state} onChange={setState}><option>Data</option><option>Empty</option><option>Loading error</option></Select></Toolbar>{state==="Loading error"?<ErrorState message="Asset records could not be read because a required value is unavailable."/>:state==="Empty"||!rows.length?<Empty icon={Boxes} title="No assets found" text="Try changing the filters or add a new asset."/>:<DataTable columns={["Asset","Type","Asset ID","Assigned to","Status"]} rows={rows} renderActions={(r,i)=> <div className="row-actions"><IconButton icon={Edit3} label="Edit" onClick={()=>open("asset")}/><MoreMenu actions={[["Reassign",UserCog,()=>open("asset")],[r[4]==="Assigned"?"Mark available":"Mark assigned",RotateCcw,()=>toggleStatus(i)],["Delete asset",Trash2,()=>deleteRow(i),true]]}/></div>}/>}</Card></>;
}

const DEPT_ORDER = ["AGN","BIC","BLK","CEO","FIN","HQ","HR","MNC","VP"];
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
  const hasReports = node.reports && node.reports.length>0;
  const isOpen = openIds.has(id);
  const selfMatch = q && (node.name.toLowerCase().includes(q)||node.title.toLowerCase().includes(q));
  const branchMatches = hierarchyMatches(node,q);
  return <div className="hier-node">
    <div className={`hier-card ${isRoot?"is-root":""} ${selfMatch?"match":""} ${q&&!branchMatches?"dim":""}`}>
      <Avatar initials={node.initials}/>
      <div><strong>{node.name}</strong><span>{node.title}</span></div>
      <Status>{node.status}</Status>
    </div>
    {hasReports && <button className="hier-toggle" onClick={()=>toggle(id)}><b>{node.reports.length}</b><ChevronDown size={12} style={{transform:isOpen?"rotate(180deg)":"none",transition:".2s"}}/></button>}
    {hasReports && isOpen && <div className="hier-children"><div className="hier-children-row">{node.reports.map((child,i)=><HierarchyNode key={i} node={child} id={`${id}/${i}`} openIds={openIds} toggle={toggle} q={q}/>)}</div></div>}
  </div>;
}
function OrgChart() {
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
  return <><PageTitle eyebrow="" title="Organization Chart" subtitle={isHierarchy?`${countHierarchy(ORG_HIERARCHY)} people in the reporting line`:`9 departments · ${teams.length} teams`}/>
    <div className="org-live-toolbar">
      <div className="view-switch org-view-switch"><button className={view==="Departments"?"active":""} onClick={()=>setView("Departments")}>Departments</button><button className={view==="Hierarchy"?"active":""} onClick={()=>setView("Hierarchy")}>Hierarchy</button></div>
      <SearchBox placeholder={isHierarchy?"Jump to an employee…":"Search team or code…"} value={q} onChange={setQ}/>
      {!isHierarchy && <Select value={deptFilter} onChange={setDeptFilter}><option>All departments</option>{DEPT_ORDER.map(d=><option key={d}>{d}</option>)}</Select>}
      <Button kind="secondary" onClick={collapseAll}>Collapse</Button><Button kind="secondary" onClick={expandAll}>Expand all</Button>
      <div className="zoom"><IconButton icon={ZoomOut} label="Zoom out" onClick={()=>setZoom(Math.max(.6,zoom-.1))}/><span>{Math.round(zoom*100)}%</span><IconButton icon={ZoomIn} label="Zoom in" onClick={()=>setZoom(Math.min(1.4,zoom+.1))}/><IconButton icon={RotateCcw} label="Reset zoom" onClick={()=>setZoom(1)}/></div>
    </div>
    <div className="org-live-canvas">
      {isHierarchy
        ? <div className="hierarchy-tree" style={{transform:`scale(${zoom})`}}><HierarchyNode node={ORG_HIERARCHY} id="root" openIds={openIds} toggle={toggleNode} q={q.trim().toLowerCase()} isRoot/></div>
        : <div className="department-tree" style={{transform:`scale(${zoom})`}}>{depts.map(d=>{const deptTeams=(byDept[d]||[]).filter(t=>!q||`${t.name} ${t.code}`.toLowerCase().includes(q.toLowerCase())); const isOpen=openDepts.has(d); if(q&&!deptTeams.length) return null; return <div className="org-dept-block" key={d}><div className="department-card"><span className="department-icon"><Building2 size={20}/></span><div><small>DEPARTMENT</small><h3>{d}</h3></div><MoreHorizontal size={16}/><b>{d}</b><span>{(byDept[d]||[]).length} team{(byDept[d]||[]).length===1?"":"s"}</span><button onClick={()=>toggleDept(d)}><ChevronDown size={14} style={{transform:isOpen?"rotate(180deg)":"none",transition:".2s"}}/></button></div>{isOpen&&<><div className="tree-connector"/><div className="team-tree-row">{deptTeams.map(t=><OrgTeam key={t.code} name={t.name} code={t.code} leader={t.leader} count={t.count}/>)}</div></>}</div>;})}</div>}
    </div>
  </>; }
function OrgTeam({name,code,leader,count}) { return <div className="org-team-card"><div><strong>{name}</strong><Users size={16}/></div><b>{code}</b><span>{leader&&leader!=="—"?leader:"No leader"} <em>{count} {count===1?"member":"members"}</em></span></div> }

const trendData = [241,246,245,253,256,264,269,275,281,287].map((value,index)=>({month:["Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"][index],value}));
const TENURE_BUCKETS=[["< 6 mo",26],["6–12 mo",97],["1–2 yr",64],["2–5 yr",97],["5+ yr",3]];
function WorkforceTrend(){return <div className="line-chart"><ResponsiveContainer width="100%" height="100%"><ReportLineChart data={trendData} margin={{top:8,right:12,left:-22,bottom:0}}><CartesianGrid stroke="#edf0ee" vertical={false}/><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize:10,fill:'#8f9290'}}/><YAxis domain={[230,300]} axisLine={false} tickLine={false} tick={{fontSize:10,fill:'#8f9290'}}/><Tooltip contentStyle={{fontSize:12,borderRadius:8,border:"1px solid #e5e8e6"}}/><Line dataKey="value" type="monotone" stroke="#018038" strokeWidth={3} dot={false} activeDot={{r:5}}/></ReportLineChart></ResponsiveContainer></div>}
function TenureChart(){return <div className="tenure-chart"><ResponsiveContainer width="100%" height="100%"><ReportBarChart data={TENURE_BUCKETS.map(([bucket,value])=>({bucket,value}))} margin={{top:8,right:4,left:-22,bottom:0}}><CartesianGrid stroke="#edf0ee" vertical={false}/><XAxis dataKey="bucket" axisLine={false} tickLine={false} tick={{fontSize:10,fill:'#8f9290'}}/><YAxis axisLine={false} tickLine={false} tick={{fontSize:10,fill:'#8f9290'}}/><Tooltip cursor={{fill:"#f4f6f4"}} contentStyle={{fontSize:12,borderRadius:8,border:"1px solid #e5e8e6"}}/><Bar dataKey="value" fill="#018038" radius={[4,4,0,0]} maxBarSize={44}/></ReportBarChart></ResponsiveContainer></div>}
function ReportsPage() {
  const departments=DEPARTMENTS;
  const onPip=EMPLOYEE_DIRECTORY.filter(e=>e.status==="On PIP");
  const departed=EMPLOYEE_DIRECTORY.filter(e=>["Resigned","Terminated","Laid Off"].includes(e.status));
  const totalHeadcount=departments.reduce((sum,[,value])=>sum+value,0);
  const summary=[
    ["Total Employees",totalHeadcount,"neutral",`Across ${departments.length} departments`],
    ["Inactive",0,"neutral","No inactive records"],
    ["On PIP",onPip.length,onPip.length?"amber":"neutral",onPip.length?"Review needed":"All clear"],
    ["Departures YTD",departed.length,departed.length?"red":"neutral",departed.length?"Resignations & terminations":"None recorded"],
  ];
  return <><PageTitle className="reports-page-title" title="Reports" subtitle="Comprehensive HR analytics and insights" actions={<div className="report-downloads">{["Headcount","Salary","Tenure","Pip"].map(x=><Button key={x} kind="secondary" icon={Download}>{x}</Button>)}</div>}/>
    <div className="metric-grid four">{summary.map(([label,value,tone,caption])=><Card className="metric" key={label}><span className="metric-label">{label}</span><strong className={`metric-value ${tone}`}>{value}</strong><small className={`metric-caption ${tone}`}>{caption}</small></Card>)}</div>
    <div className="report-live-grid">
      <Card className="span-2 workforce-report"><div className="card-head"><h2><TrendingUp size={18}/>Workforce Growth</h2><p>Total headcount over the last 10 months</p></div><WorkforceTrend/></Card>
      <Card className="payroll-report"><div className="card-head"><h2>Payroll Summary</h2></div><Empty icon={WalletCards} title="Payroll not connected" text="Connect a payroll provider to see gross pay, deductions and net pay by department."/></Card>
      <Card className="department-report"><div className="card-head"><h2><BriefcaseBusiness size={18}/>Headcount by Department</h2><button onClick={()=>announce("Headcount CSV export prepared")}><Download size={13}/>CSV</button></div>{departments.map(([name,value])=><div className="department-bar" key={name}><span>{name}<b>{value} ({value}A / 0I)</b></span><i><em style={{width:`${Math.max(8,value/84*100)}%`}}/></i></div>)}</Card>
      <Card className="employment-report"><div className="card-head"><h2><Users size={18}/>Employment Type</h2></div><div className="employment-row"><strong>{totalHeadcount}</strong><div><b>Full-time</b><span>100% of workforce</span></div><i/></div><h3>AVG HOURLY RATE BY DEPARTMENT</h3>{departments.map(([n])=><p key={n}>{n}<b>{n==="UNASSIGNED"?"$0/hr":"$25/hr"}</b></p>)}</Card>
      <Card><div className="card-head"><h2><BriefcaseBusiness size={18}/>Open Positions</h2><p>Active requisitions across the company</p></div>{OPEN_POSITIONS.map(([role,dept,candidates])=><div className="mini-row" key={role}><span><strong>{role}</strong> · {dept}</span><span>{candidates}</span></div>)}</Card>
      <Card><div className="card-head"><h2><UserMinus size={18}/>Departures</h2><p>Resignations, terminations and layoffs this year</p></div>{departed.length?<div className="people-list">{departed.map(e=><div className="person-row" key={e.name}><Avatar initials={e.initials} small/><div><strong>{e.name}</strong><span>{e.title}</span></div><time>{e.separationDate}<small>{e.status}</small></time></div>)}</div>:<Empty icon={UserMinus} title="0" text="No departures recorded"/>}</Card>
      <Card><div className="card-head"><h2>PIP Report</h2></div>{onPip.length?<div className="people-list">{onPip.map(e=><div className="person-row" key={e.name}><Avatar initials={e.initials} small/><div><strong>{e.name}</strong><span>{e.title}</span></div></div>)}</div>:<Empty icon={AlertTriangle} title="0" text="No active PIPs"/>}</Card>
      <Card><div className="card-head"><h2><ShieldCheck size={18}/>Document Compliance</h2></div><Empty icon={ShieldCheck} title="Not tracked yet" text="Connect e-signature status to see contract completion by employee here."/></Card>
      <Card><div className="card-head"><h2><BarChart3 size={18}/>Saved Reports</h2></div>{[["Headcount by department","Headcount CSV export prepared"],["Payroll summary","Payroll CSV export prepared"],["Members on PIP","PIP CSV export prepared"]].map(([label,msg])=><div className="mini-row" key={label}><span><strong>{label}</strong></span><button onClick={()=>announce(msg)}>Run →</button></div>)}</Card>
      <Card className="span-2"><div className="card-head"><h2>Tenure Analysis</h2><p>Distribution of employees by time in company</p></div><div className="tenure-head"><strong>19 mo</strong><span>Average Tenure</span></div><TenureChart/><h3 className="tenure-longest-head">LONGEST TENURED</h3><div className="people-list">{LONGEST_TENURED.map(([name,dept,years])=><div className="person-row" key={name}><Avatar initials={name.split(" ").slice(0,2).map(w=>w[0]).join("")} small/><div><strong>{name}</strong><span>{dept}</span></div><span className="tenure-longest-tag">{years}</span></div>)}</div></Card>
    </div>
  </> }

function AnnouncementsPage({open}) {
  return <><PageTitle title="Announcements" subtitle="Broadcast updates to the whole company or specific teams." actions={<Button icon={Megaphone} onClick={()=>open("announcement")}>New Announcement</Button>}/>
    <Card><div className="card-head"><h2>All announcements</h2></div><div className="people-list">{ANNOUNCEMENTS.map(([title,audience,by,when,status])=><div className="person-row" key={title}><span className="team-icon"><Megaphone size={18}/></span><div><strong>{title}</strong><span>{audience} · posted by {by}</span></div><time>{when}<small>{status}</small></time></div>)}</div></Card>
  </> }
function DocumentsPage({open,go}) {
  return <><PageTitle className="docs-page-title" title="Documents & Templates" subtitle="Company templates and org-wide document management." actions={<Button kind="secondary" icon={Upload} onClick={()=>open("document")}>Upload</Button>}/>
    <div className="doc-template-grid">{DOCUMENT_TEMPLATES.map(([name,desc,bg,fg])=><button className="card doc-template-card" key={name} onClick={()=>go(`/documents/${slugify(name)}`)}><span className="doc-template-icon" style={{background:bg,color:fg}}><FileText size={20}/></span><h3>{name}</h3><p>{desc}</p><span className="doc-template-link">Template · edit →</span></button>)}</div>
    <Card><div className="card-head"><h2>Company documents</h2></div><div className="people-list">{COMPANY_DOCUMENTS.map(([name,meta,status])=><button className="person-row" key={name} onClick={()=>go(`/documents/${slugify(name)}`)}><span className="team-icon"><FileText size={18}/></span><div><strong>{name}</strong><span>{meta}</span></div><Status>{status}</Status></button>)}</div></Card>
  </> }
function DocumentDetail({go,path}) {
  const slug=(path||"").slice(11);
  const tpl=DOCUMENT_TEMPLATES.find(([n])=>slugify(n)===slug);
  const doc=COMPANY_DOCUMENTS.find(([n])=>slugify(n)===slug);
  if(!tpl&&!doc) return <><button className="back-link" onClick={()=>go("/documents")}><ArrowLeft size={16}/>Back to Documents</button><Empty icon={FileText} title="Document not found" text="This document or template doesn't exist."/></>;
  const name=tpl?tpl[0]:doc[0]; const desc=tpl?tpl[1]:doc[1]; const status=doc?doc[2]:null; const fg=tpl?tpl[3]:"#018038";
  return <><button className="back-link" onClick={()=>go("/documents")}><ArrowLeft size={16}/>Back to Documents</button>
    <Card className="team-detail-hero"><span className="team-detail-line"/><span className="live-team-icon large" style={{background:`linear-gradient(135deg,${fg},#111)`}}><FileText size={26}/></span><div className="team-detail-copy"><small>{tpl?"TEMPLATE":"COMPANY DOCUMENT"}</small><div><h1>{name}</h1>{status&&<span className="team-code">{status}</span>}</div><p>{desc}</p></div><div className="team-detail-actions"><Button kind="secondary" icon={Download} onClick={()=>announce(`${name} downloaded`)}>Download</Button>{tpl&&<Button kind="secondary" icon={Edit3} onClick={()=>announce(`${name} template editor opened`)}>Edit Template</Button>}</div></Card>
    <Card><div className="card-head"><h2>Details</h2></div><Info rows={tpl?[["Type","Template"],["Used for",desc],["Last updated","May 7, 2026"],["Owner","HR Operations"]]:[["Type","Company document"],["Description",desc],["Status",status],["Last updated","May 7, 2026"]]}/></Card>
  </> }
function FeedbacksPage({open}) {
  const [rows,setRows]=useState([["H1 2026 Performance Review","Jan 15 – Jun 30, 2026","All employees","Completed"],["Q3 Leadership Feedback","Jul 1 – Sep 30, 2026","Team leads","Active"],["Probation Review","Ongoing","New employees","Active"]]);
  const duplicate=(i)=>{const r=rows[i];setRows([...rows,[`${r[0]} (copy)`,r[1],r[2],"Active"]]);announce(`${r[0]} duplicated`)};
  const archive=(i)=>{announce(`${rows[i][0]} archived`);setRows(rows.filter((_,idx)=>idx!==i))};
  return <><PageTitle title="Feedback Cycles" subtitle="Create and manage employee feedback cycles" actions={<Button icon={Plus} onClick={()=>open("feedback-cycle")}>Create Cycle</Button>}/><div className="metric-grid three">{[["Active cycles","2"],["Open responses","94"],["Completion rate","76%"]].map(x=><Card className="simple-metric" key={x[0]}><span>{x[0]}</span><strong>{x[1]}</strong></Card>)}</div><Card><Toolbar><SearchBox placeholder="Search cycles"/><Select><option>All statuses</option><option>Active</option><option>Completed</option></Select></Toolbar><DataTable columns={["Cycle","Period","Audience","Status"]} rows={rows} renderActions={(r,i)=> <div className="row-actions"><IconButton icon={Eye} label="View" onClick={()=>open("feedback-cycle",r)}/><MoreMenu actions={[["Edit cycle",Edit3,()=>open("feedback-cycle",r)],["Duplicate",Copy,()=>duplicate(i)],["Archive",Archive,()=>archive(i),true]]}/></div>}/></Card></>;
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
  const active = path==="/settings" ? "/settings/departments" : path;
  return <><div className="tabs-scroll"><div className="tabs line-tabs settings-tabs">{SETTINGS_TABS.map(([label,to])=>{const locked=to==="/settings/platform"&&role!=="Super Admin"; return <button key={to} className={active===to?"active":""} disabled={locked} title={locked?"Super Admin only":undefined} onClick={()=>!locked&&go(to)}>{label}{locked&&<LockKeyhole size={11}/>}</button>})}</div></div>{children}</>;
}
function SettingsList({kind,open}) {
  const [departmentItems,setDepartmentItems]=useState(()=>["AGN","BIC","BLK","CEO","FIN","HQ","HR","MNC","VP"].map(c=>({name:c,code:c})));
  const [entityItems,setEntityItems]=useState(["MUST Company PK","MUST Engage","MUST U"]);
  const [newName,setNewName]=useState(""); const [newCode,setNewCode]=useState(""); const [confirming,setConfirming]=useState("");
  if(kind==="requestTypes") return <><PageTitle title="Request Types" subtitle="Define Employee Services request forms and their approval workflows" actions={<Button icon={Plus} onClick={()=>open("request-type")}>Add Request Type</Button>}/><Card className="live-empty-card"><Empty icon={ListChecks} title="No Request Types" text="Create your first request type (e.g. Overtime, Shift Adjustment)."/></Card></>;
  if(kind==="feedbackForms") return <><PageTitle title="Feedback Forms" subtitle="Create and manage feedback form templates used in cycles" actions={<Button icon={Plus} onClick={()=>open("feedback-form")}>New form</Button>}/><Card className="feedback-form-row"><div><h3>Next Level Growth – Monthly 360° Reflection <span>System</span></h3><p>Monthly 360° reflection covering collaboration, communication, growth, problem-solving, and ownership.</p><small>5 steps · 25 questions · updated May 7, 2026</small></div><div><IconButton icon={Edit3} label="Edit" onClick={()=>open("feedback-form")}/><IconButton icon={Copy} label="Duplicate" onClick={()=>announce("Feedback form duplicated")}/></div></Card></>;
  if(kind==="leaveTypes") return <><PageTitle title="Leave Types" subtitle="Configure the types of leave employees can apply for — mirrors what employees see in Apply for Leave" actions={<Button icon={Plus} onClick={()=>open("leave-type")}>Add Leave Type</Button>}/><div className="leave-type-list">{LEAVE_TYPES.map(t=><Card className="leave-type-row" key={t.key}><span className={t.tone}><CalendarDays size={20}/></span><div><h3>{t.name} <b>{t.entitlement} · {t.unit}</b><em className={t.paid?"":"unpaid"}>{t.paid?"Paid":"Unpaid"}</em></h3><p>{t.policy}</p></div><div className="row-actions"><IconButton icon={Archive} label={`Deactivate ${t.name}`} onClick={()=>announce(`${t.name} deactivated`)}/><IconButton icon={Edit3} label="Edit" onClick={()=>open("leave-type")}/><IconButton icon={Trash2} label="Delete" className="danger-hover" onClick={()=>open("delete")}/></div></Card>)}</div></>;
  const isDept=kind==="departments"; const title=isDept?"Departments":"Company Entities"; const sub=isDept?"The top of the org hierarchy — Department → Team → Team Code.":"The legal/brand entities employees belong to (e.g. MUST Company PK, MUST U, MUST Engage)."; const items=isDept?departmentItems:entityItems;
  const addItem=()=>{
    if(isDept){ const code=newCode.trim().toUpperCase(); if(!code){announce("Enter a department code","error");return} if(items.some(d=>d.code===code)){announce("This record already exists","error");return} setDepartmentItems([...items,{name:newName.trim()||code,code}]); }
    else { const name=newName.trim(); if(!name){announce("Enter a company entity","error");return} if(items.some(x=>x.toLowerCase()===name.toLowerCase())){announce("This record already exists","error");return} setEntityItems([...items,name]); }
    setNewName("");setNewCode("");announce(`${isDept?"Department":"Company entity"} added`);
  };
  const removeItem=(key)=>{ if(isDept)setDepartmentItems(items.filter(d=>d.code!==key)); else setEntityItems(items.filter(x=>x!==key)); setConfirming("");announce(`${key} deleted and recorded in Activity Logs`); };
  return <><PageTitle title={title} subtitle={sub}/><div className="settings-layout"><Card className="settings-create"><h2>{isDept?"Add Department":"Add Company Entity"}</h2><div className={isDept?"department-create":"entity-create"}>{isDept?<><Field label="Department Title"><input value={newName} onChange={e=>setNewName(e.target.value)} placeholder="e.g. Human Resource"/></Field><Field label="Department Code"><input value={newCode} onChange={e=>setNewCode(e.target.value)} placeholder="e.g. HR"/></Field><Button icon={Plus} onClick={addItem}>Add Department</Button></>:<><Field label="New Company Entity"><input value={newName} onChange={e=>setNewName(e.target.value)} placeholder="e.g. MUST Engage"/></Field><Button icon={Plus} onClick={addItem}>Add</Button></>}</div></Card><Card className="settings-rows">{items.map(item=>{const key=isDept?item.code:item; const name=isDept?item.name:item; const code=isDept?item.code:null; return <React.Fragment key={key}><div className="settings-row"><span><Building2 size={17}/></span><strong>{name}</strong>{code&&code!==name&&<b>{code}</b>}<IconButton icon={Edit3} label={isDept?"Edit":"Rename"} onClick={()=>open(isDept?"department":"entity")}/><IconButton icon={Trash2} label="Delete" className="danger-hover" onClick={()=>setConfirming(key)}/></div>{confirming===key&&<div className="settings-confirm"><AlertTriangle size={18}/><div><strong>Delete {name}?</strong><p>{isDept?"Teams and employees using this department must be reassigned first.":"Employees linked to this entity must be reassigned first."}</p></div><Button kind="secondary" onClick={()=>setConfirming("")}>Cancel</Button><Button kind="danger" onClick={()=>removeItem(key)}>Delete</Button></div>}</React.Fragment>})}</Card></div></>;
}

function UsersPage({open}) {
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
  return <><PageTitle title="User & Role Management" subtitle="Manage user accounts, create custom roles, and control granular permissions" actions={<Button icon={tab==="Users"?UserPlus:Plus} onClick={()=>open(tab==="Users"?"user":"role")}>{tab==="Users"?"Create User":"Create Role"}</Button>}/><div className="tabs pill-tabs live-user-tabs"><button className={tab==="Users"?"active":""} onClick={()=>setTab("Users")}>Users (288)</button><button className={tab==="Roles"?"active":""} onClick={()=>setTab("Roles")}>Roles & Permissions (3)</button></div>{tab==="Users"?<><div className="user-filters"><SearchBox placeholder="Search by name, email, or role…" value={q} onChange={setQ}/><FilterMenu value={filter} options={["Active","Blocked","All"]} counts={filterCounts} onChange={x=>{setFilter(x);setSelected(new Set())}}/><FilterMenu value={roleFilter} options={["All Roles","Employee","Admin","Super Admin"]} counts={roleCounts} onChange={setRoleFilter}/></div>{selected.size>0&&<div className="bulk-action-bar"><strong>{selected.size} selected</strong><Button kind="secondary" onClick={()=>bulkRole("Admin")}>Set as Admin</Button><Button kind="secondary" onClick={()=>bulkRole("Employee")}>Set as Employee</Button>{selectedAllBlocked?<Button icon={UserCheck} onClick={()=>{setStatus([...selected],"Active");setSelected(new Set())}}>Restore access</Button>:<Button kind="danger" icon={UserMinus} onClick={()=>{setStatus([...selected],"Blocked");setSelected(new Set())}}>Block access</Button>}<button className="bulk-clear" onClick={()=>setSelected(new Set())}>Clear</button></div>}{visible.length?<><ScrollFadeTable className="user-live-table table-scroll responsive-table"><table><thead><tr><th className="checkbox-cell"><input type="checkbox" checked={selected.size>0&&selected.size===visible.length} onChange={toggleAll} aria-label="Select all users"/></th>{["User","Role","Team","Last Active","Actions"].map(x=><th key={x}>{x}</th>)}</tr></thead><tbody>{visible.map(r=><React.Fragment key={r.email}><tr><td className="checkbox-cell" data-label=""><input type="checkbox" checked={selected.has(r.email)} onChange={()=>toggleOne(r.email)} aria-label={`Select ${r.name}`}/></td><td data-label="User"><span className="person-cell"><Avatar initials={r.ini} small/><span><strong>{r.name}</strong><small>{r.email}</small>{r.status==="Blocked"&&<em className="blocked-tag">Blocked</em>}</span></span></td><td data-label="Role"><label className={`role-select ${r.role==="Super Admin"?"super":""}`}><select value={r.role} onChange={e=>changeRole(r.email,e.target.value)} aria-label={`Role for ${r.name}`}><option>Employee</option><option>Admin</option><option>Super Admin</option></select><ChevronDown size={12}/></label></td><td data-label="Team">{r.team}</td><td data-label="Last Active">{r.lastActive}</td><td data-label="Actions"><div className="row-actions"><Button kind="secondary" icon={LockKeyhole} onClick={()=>announce(`Password reset instructions sent to ${r.email}`)}>Reset</Button>{r.status==="Active"?<Button kind="danger" icon={UserMinus} onClick={()=>setConfirmBlock(r.email)}>Block</Button>:<Button kind="secondary" icon={UserCheck} onClick={()=>setStatus([r.email],"Active")}>Restore</Button>}</div></td></tr>{confirmBlock===r.email&&<tr className="confirm-row"><td colSpan={6}><div className="settings-confirm"><AlertTriangle size={18}/><div><strong>Block {r.name}'s access?</strong><p>They won't be able to sign in until you restore access. Their employee record and history are kept.</p></div><Button kind="secondary" onClick={()=>setConfirmBlock(null)}>Cancel</Button><Button kind="danger" onClick={()=>{setStatus([r.email],"Blocked");setConfirmBlock(null)}}>Block access</Button></div></td></tr>}</React.Fragment>)}</tbody></table></ScrollFadeTable><p className="users-footer-note">Showing {visible.length} of 288 total users</p></>:<Card><Empty icon={UserMinus} title={filter==="Blocked"?"No blocked users":"No users found"} text={filter==="Blocked"?"Blocked accounts will appear here.":"Try a different name, email, or role."}/></Card>}</>:<div className="role-card-grid">{roles.map(([name,desc,permissions,users,key,tone])=><Card className={`role-card ${tone}`} key={name}><h3>{name} <span><LockKeyhole size={10}/>System</span></h3><p>{desc}</p><div><span>PERMISSIONS<strong>{permissions}</strong></span><span>USERS<strong>{users}</strong></span><span>KEY<code>{key}</code></span></div><button onClick={()=>open("role")}>Manage Permissions →</button></Card>)}</div>}</>;
}

const ACTIVITY_ACTIONS=["All","Created","Updated","Approved","Rejected","Deleted","Viewed","Logged in"];
const MUTATING_ACTIONS=["Created","Updated","Deleted","Approved","Rejected"];
function ActivityLogsPage() {
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
  return <><PageTitle title="Activity Logs" subtitle="Every action across the system — who did what, to whom, and when."/><div className="activity-filters"><div className="activity-filters-row"><SearchBox placeholder="Search by person, action, or resource…"/><FilterMenu value={action} options={ACTIVITY_ACTIONS} counts={actionCounts} onChange={setAction}/><button className={`filters-toggle ${moreFilters?"active":""}`} onClick={()=>setMoreFilters(v=>!v)}><SlidersHorizontal size={15}/>More filters{activeFilterCount>0&&<b>{activeFilterCount}</b>}</button></div><div className={`activity-filters-row activity-filters-secondary ${moreFilters?"open":""}`}>
    <div className="activity-filter-field"><span>Actor</span><Select value={actor} onChange={setActor}>{actors.map(a=><option key={a}>{a}</option>)}</Select></div>
    <div className="activity-filter-field"><span>Record type</span><Select value={recordType} onChange={setRecordType}>{recordTypes.map(r=><option key={r}>{r}</option>)}</Select></div>
    <div className="activity-filter-field"><span>&nbsp;</span><button type="button" className={`changes-only-toggle ${changesOnly?"active":""}`} onClick={()=>setChangesOnly(v=>!v)} title="Hide sign-ins and record views — show only actions that changed data (created, updated, deleted, approved, rejected)"><Check size={14}/>Data changes only</button></div>
    <div className="activity-filter-field date-range"><span>Date range</span><div className="date-range"><input type="date" aria-label="From date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)}/><span>to</span><input type="date" aria-label="To date" value={dateTo} onChange={e=>setDateTo(e.target.value)}/></div></div>
  </div></div><p className="activity-count">Showing {visible.length} of {rows.length} entries{activeFilterCount>0?` — ${activeFilterCount} filter${activeFilterCount>1?"s":""} applied`:""}</p>{visible.length?<div className="activity-table table-scroll responsive-table"><table><thead><tr>{["When","Who","Action","On","Status","IP","Details"] .map(x=><th key={x}>{x}</th>)}</tr></thead><tbody>{visible.map((r,i)=><tr key={i} className="clickable" onClick={()=>setDetail(r)}><td data-label="When">{r[0]}</td><td data-label="Who"><span className="person-cell"><Avatar initials={r[1]} small/><strong>{r[2]}</strong></span></td><td data-label="Action"><span className="action-cell"><Status>{r[3]}</Status>{r[4]}</span></td><td data-label="On">{r[5]}</td><td data-label="Status">{r[6]}</td><td data-label="IP">{r[7]}</td><td data-label="Details" onClick={e=>e.stopPropagation()}><IconButton icon={Eye} label="View details" onClick={()=>setDetail(r)}/></td></tr>)}</tbody></table></div>:<Card><Empty icon={ListChecks} title="No matching activity" text="No audit entries match these filters. Try clearing one and searching again."/></Card>}{detail&&<Modal title="Activity detail" subtitle="A complete record of this change" onClose={()=>setDetail(null)}><Info rows={[["Action",detail[3]],["Description",detail[4]],["Actor",detail[2]],["Date and time",detail[0]],["On",detail[5]],["IP address",detail[7]]]}/></Modal>}</> }

function PlatformSettings({open}) {
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
  return <><PageTitle title="Platform Settings" subtitle="Super-admin-only controls for the platform"/><Card className="platform-card"><div className="platform-heading"><Crown size={20}/><div><h2>Super Admins</h2><p>Only a Super Admin can grant or revoke the Super Admin role.</p></div></div><h3>CURRENT SUPER ADMINS (5)</h3><div className="platform-people">{admins.map(([ini,name,email])=><div key={email}><Avatar initials={ini} small/><span><strong>{name}</strong><small>{email}</small></span><button disabled={ini==="MI"} onClick={()=>open("remove-admin")}><UserMinus size={14}/>Remove</button></div>)}</div><h3>PROMOTE A USER</h3><SearchBox placeholder="Search users by name or email…"/><div className="platform-people candidates">{candidates.map(([ini,name,email])=><div key={email}><Avatar initials={ini} small/><span><strong>{name}</strong><small>{email}</small></span><button onClick={()=>open("super-admin")}><UserPlus size={14}/>Make Super Admin</button></div>)}</div></Card>
    <Card className="platform-card"><div className="platform-heading"><AlertTriangle size={20}/><div><h2>Crashes & Reported Issues</h2><p>Server & client crashes plus problems reported by users.</p></div></div><div className="employee-statuses">{["open","resolved","all"].map(x=><button key={x} className={issueFilter===x?"active":""} onClick={()=>setIssueFilter(x)}>{x} <b>{x==="all"?issues.length:issues.filter(i=>i.status===x).length}</b></button>)}</div><div className="issue-list">{visibleIssues.length?visibleIssues.map(i=><div className="issue-row" key={i.id}><span className={`issue-severity ${i.severity}`}/><div><strong>{i.title}</strong><p>{i.detail}</p><small>Reported by {i.reporter} · {i.reported}</small></div><Button kind="secondary" onClick={()=>toggleIssue(i.id)}>{i.status==="open"?"Mark resolved":"Reopen"}</Button></div>):<Empty icon={Check} title={`No ${issueFilter==="all"?"":issueFilter+" "}issues`} text={issueFilter==="resolved"?"Resolved crashes and reports will appear here.":"Nothing to review right now."}/>}</div></Card>
    <Card className="platform-card"><div className="platform-heading"><Settings size={20}/><div><h2>System Flags</h2><p>Platform-wide toggles — changes apply immediately for everyone.</p></div></div><div className="flag-list">
      <label className="flag-toggle"><input type="checkbox" checked={flags.maintenance} onChange={()=>toggleFlag("maintenance","Maintenance mode")}/><span className="flag-toggle-track"><span className="flag-toggle-thumb"/></span><span className="flag-toggle-copy"><strong>Maintenance mode</strong><small>Shows a maintenance banner and blocks sign-in for everyone except Super Admins.</small></span></label>
      <label className="flag-toggle"><input type="checkbox" checked={flags.require2fa} onChange={()=>toggleFlag("require2fa","Two-factor authentication requirement")}/><span className="flag-toggle-track"><span className="flag-toggle-thumb"/></span><span className="flag-toggle-copy"><strong>Require 2FA for Admin &amp; Super Admin</strong><small>Admin-level accounts must set up two-factor authentication before they can sign in.</small></span></label>
      <label className="flag-toggle"><input type="checkbox" checked={flags.selfRegister} onChange={()=>toggleFlag("selfRegister","Self-registration")}/><span className="flag-toggle-track"><span className="flag-toggle-thumb"/></span><span className="flag-toggle-copy"><strong>Allow self-registration</strong><small>Let people with a @must.company email create their own account instead of being invited.</small></span></label>
    </div></Card>
    <Card className="platform-card danger-zone"><div className="platform-heading"><AlertTriangle size={20}/><div><h2>Danger Zone</h2><p>Destructive actions that can't be undone — review carefully before confirming.</p></div></div>
      <div className="danger-block"><h3>Clear notifications for one person</h3><p>Removes every Slack DM this app has sent to the selected person — they'll stop seeing old reminders, but new ones will still be delivered normally. Cannot be undone.</p><div className="danger-controls"><Select value={member} onChange={setMember}><option value="">Select a member…</option><option>Ri Le Tan</option><option>Afroas Jameela</option></Select><Button kind="danger" disabled={!member} onClick={()=>{announce(`Slack notifications cleared for ${member}`);setMember("")}}>Clear for this person</Button></div></div>
      <div className="danger-block danger-block-severe"><h3><AlertTriangle size={13}/>Clear notifications for everyone</h3><p>Removes every Slack DM this app has ever sent, for <strong>all 288 employees</strong> at once. This cannot be undone and cannot be limited to one person after the fact — type <strong>CLEAR</strong> below to confirm you understand the scope.</p><div className="danger-controls"><input aria-label="Type CLEAR to confirm" placeholder="Type CLEAR to confirm" value={confirm} onChange={e=>setConfirm(e.target.value)}/><Button kind="danger" disabled={confirm!=="CLEAR"} onClick={()=>{announce("Slack notifications cleared for everyone");setConfirm("")}}>Clear for everyone</Button></div></div>
    </Card></> }

function FeedbackBuilder({open,go}) { const [questions,setQuestions]=useState(["What went well during this review period?","Where could this employee improve?","How would you rate overall performance?"]); const [section,setSection]=useState(0); const sections=["Performance","Growth & Development","Values"]; return <><button className="back-link" onClick={()=>go("/settings/feedback-forms")}><ArrowLeft size={16}/>Back to feedback forms</button><PageTitle eyebrow="Feedback Form" title="Performance Review" subtitle="Build sections and questions for this feedback form" actions={<><Button kind="secondary" icon={Eye}>Preview</Button><Button icon={Check}>Save Form</Button></>}/><div className="builder-layout"><Card className="builder-sidebar"><h2>Sections</h2>{sections.map((name,i)=><button key={name} className={section===i?"active":""} onClick={()=>setSection(i)}>{i+1}. {name}</button>)}<Button kind="secondary" icon={Plus}>Add Section</Button></Card><Card><Field label="Section title"><input value={sections[section]} readOnly/></Field><Field label="Description"><input defaultValue="Review the employee's delivery, strengths and development areas."/></Field><div className="question-list">{questions.map((q,i)=><div className="question" key={`${i}-${q}`}><span className="drag">⋮⋮</span><div><small>Question {i+1}</small><input value={q} onChange={e=>setQuestions(questions.map((x,j)=>j===i?e.target.value:x))}/><Select><option>{i===2?"Rating scale":"Long answer"}</option><option>Short answer</option><option>Multiple choice</option></Select></div><IconButton icon={Trash2} label="Delete question" danger onClick={()=>setQuestions(questions.filter((_,j)=>j!==i))}/></div>)}</div><Button kind="secondary" icon={Plus} onClick={()=>setQuestions([...questions,"New question"])}>Add Question</Button></Card></div></> }

// Employee-facing leave application — one continuous scrollable form (type picker, dates/time,
// balance preview, reason, attachment, approval route) matching how the live HRIS presents it.
// Step 1: compact, searchable list — name + the one or two facts that matter for picking (paid
// status, balance). Step 2: the type you picked, its full policy tucked behind a disclosure so it
// doesn't compete with the actual form, then the date/time/reason/attachment fields.
function LeaveTypePicker({ query, onQuery, onSelect, onBack, backLabel }) {
  const filtered = LEAVE_TYPES.filter(t=>t.name.toLowerCase().includes(query.toLowerCase()));
  return <>
    {onBack && <button type="button" className="back-link" onClick={onBack}><ArrowLeft size={15}/>{backLabel}</button>}
    <p>Choose the leave type that matches your situation.</p>
    <input type="hidden" required readOnly aria-hidden="true" style={{display:"none"}} value=""/>
    <SearchBox placeholder="Search leave types…" value={query} onChange={onQuery}/>
    <div className="type-list">{filtered.length?filtered.map(t=><button type="button" key={t.key} className="type-list-row" onClick={()=>onSelect(t.key)}>
      <i className={`tone-dot ${t.tone}`}/>
      <span className="type-list-row-copy"><strong>{t.name}</strong><small>{t.paid?"Paid":"Unpaid"} · {t.entitlement} · {t.unit}</small></span>
      <span className="type-list-row-balance">{t.balance}</span>
      <ChevronRight size={16}/>
    </button>):<p className="type-empty">No leave types match "{query}".</p>}</div>
  </>;
}

function LeaveDetailForm({ type, onBack, backLabel }) {
  const [start, setStart] = useState(""); const [end, setEnd] = useState("");
  const ready = start && end;
  return <>
    <button type="button" className="back-link" onClick={onBack}><ArrowLeft size={15}/>{backLabel}</button>
    <div className="type-detail-head">
      <div className="type-detail-title"><i className={`tone-dot ${type.tone}`}/><h3>{type.name}</h3><span className={`type-paid-tag ${type.paid?"paid":"unpaid"}`}>{type.paid?"Paid":"Unpaid"}</span></div>
      <div className="type-detail-stats">
        <div><span>Entitlement</span><strong>{type.entitlement}</strong></div>
        <div><span>Unit</span><strong>{type.unit}</strong></div>
        <div><span>Balance</span><strong className="green">{type.balance}</strong></div>
      </div>
      <div className="type-detail-policy"><span>Policy</span><p>{type.policy}</p></div>
    </div>
    <div className="form-grid">
      <Field label="Start date" required><input type="date" value={start} onChange={e=>setStart(e.target.value)}/></Field>
      <Field label="End date" required><input type="date" value={end} onChange={e=>setEnd(e.target.value)}/></Field>
      <Field label="From (time)" required><input type="time" defaultValue="09:00"/></Field>
      <Field label="To (time)" required><input type="time" defaultValue="17:00"/></Field>
    </div>
    <p className="form-hint-box">For a partial day, set the exact hours you'll be off (e.g. 09:00–13:00 = half day).</p>
    <Field label="Hours" hint="Auto-calculated from the date & time window."><input disabled placeholder="—" value=""/></Field>
    <div className="balance-preview">
      <div><span>Current balance</span><strong>{type.balance}</strong></div>
      <div><span>Requested</span><strong>{ready?"Auto-calculated":"—"}</strong></div>
      <div><span>Balance after</span><strong>{ready?"Auto-calculated":"—"}</strong></div>
    </div>
    <Field label="Reason" required full><textarea placeholder="Please describe the reason for your leave request…"/></Field>
    <Field label="Attachments / supporting documents (optional)" full><div className="dropzone"><Upload size={20}/><strong>Attach a file</strong><span>PDF, image, Word or Excel</span></div></Field>
    <p className="form-hint-box"><strong>Approval flow:</strong> The system validates your eligibility automatically, then your request goes to your reporting manager for approval, and finally to HR for the final decision.</p>
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
      <p>Choose what you'd like to request.</p>
      <input type="hidden" required readOnly aria-hidden="true" style={{display:"none"}} value=""/>
      <SearchBox placeholder="Search request types…" value={query} onChange={setQuery}/>
      <div className="type-list">
        {showLeave && <button type="button" className="type-list-row" onClick={()=>setSelected("leave")}>
          <i className="tone-dot green"/>
          <span className="type-list-row-copy"><strong>Leave</strong><small>Time off & all leave types · Approval: Manager → HR</small></span>
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
    <button type="button" className="back-link" onClick={()=>setSelected(null)}><ArrowLeft size={15}/>Back to request types</button>
    <div className="type-detail-head"><h3><i className={`tone-dot ${type.tone}`}/>{type.name}</h3><small>Approval: {type.approval}</small></div>
    <div className="form-grid"><Field label={type.fieldLabel} required full><textarea placeholder={`Describe your ${type.fieldLabel.toLowerCase()}…`}/></Field></div>
    <Field label="Attachments / supporting documents (optional)" full><div className="dropzone"><Upload size={20}/><strong>Attach a file</strong><span>PDF, image, Word or Excel</span></div></Field>
    <p className="form-hint-box"><strong>Approval flow:</strong> {type.approval}.</p>
  </>;
}

// Footer for leave-detail/request-detail: read-only Close for employees and decided records;
// Approve/Reject — with a required rejection reason — for a lead/admin viewing a pending record.
function DetailFooter({ data, role, onClose }) {
  const [confirmingReject, setConfirmingReject] = useState(false);
  const [reason, setReason] = useState("");
  const canDecide = role && role !== "Employee";
  if (!data || !canDecide || data.status !== "Pending") return <Button kind="secondary" onClick={onClose}>Close</Button>;
  if (confirmingReject) return <div className="reject-confirm-footer">
    <textarea autoFocus placeholder="Explain why this is being rejected — the employee will see this reason." value={reason} onChange={e=>setReason(e.target.value)}/>
    <div className="reject-confirm-actions">
      <Button kind="secondary" onClick={()=>{setConfirmingReject(false);setReason("")}}>Back</Button>
      <Button kind="danger" icon={X} onClick={()=>{if(!reason.trim()){announce("Add a reason before rejecting","error");return;}announce(`Rejected — ${reason.trim()}`,"error");onClose();}}>Confirm reject</Button>
    </div>
  </div>;
  return <><Button kind="secondary" onClick={onClose}>Close</Button><Button kind="danger" icon={X} onClick={()=>setConfirmingReject(true)}>Reject</Button><Button icon={Check} onClick={()=>{announce("Approved and added to decision history");onClose();}}>Approve</Button></>;
}

function ModalContent({type, data, role}) {
  if (["employee","team","asset","user","leave","department","entity","note","qualification","identity","salary","bank","member"].includes(type)) return <BasicForm type={type}/>;
  if (type==="document") return <div className="form-grid"><Field label="Document name" required/><Field label="Document type" required><Select><option>Employment contract</option><option>Certificate</option><option>Other</option></Select></Field><Field label="Expiry date"><input type="date"/></Field><Field label="File" required full><div className="dropzone"><Upload size={22}/><strong>Choose a file or drag it here</strong><span>PDF, DOCX, JPG or PNG up to 10 MB</span></div></Field></div>;
  if (type==="balance") return <><Info rows={[["Employee","Matilda Ipeh Anashie"],["Leave type","Annual Leave"],["Current allowance","15 days"],["Current balance","8 days"]]}/><div className="form-grid"><Field label="Adjustment" required><input type="number" defaultValue="0"/></Field><Field label="New balance"><input disabled value="8 days" readOnly/></Field><Field label="Reason" required full><textarea placeholder="Explain this adjustment"/></Field></div></>;
  if (type==="pip"||type==="ida") return <div className="form-grid"><Field label="Start date" required><input type="date"/></Field><Field label="End date"><input type="date"/></Field><Field label="Reason" required full><textarea/></Field><Field label="Notes" full><textarea/></Field></div>;
  if (type==="apply-leave") return <ApplyLeaveForm/>;
  if (type==="new-request") return <NewRequestForm/>;
  if (type==="leave-detail") { const d=data||LEAVE_REQUESTS[0]; return <>
    <div className="request-summary"><Avatar initials={d.initials}/><div><h3>{d.employee}</h3><p>{d.type} · {d.hours}</p></div><Status>{d.status}</Status></div>
    <div className="detail-flags">
      {d.team && <span className="detail-flag">{d.team}{d.teamCode?` · ${d.teamCode}`:""}</span>}
      {d.overlap && <span className="detail-flag warn"><AlertTriangle size={12}/>{d.overlap}</span>}
      {!!d.attachments && <span className="detail-flag info"><FileText size={12}/>{d.attachments} attachment{d.attachments>1?"s":""}</span>}
    </div>
    <Info rows={[["Dates",d.dates],["Time",`${d.time} · ${d.timezone}`],["Hours",d.hours],["Submitted",d.submitted],["Reason",d.reason],["Manager",d.manager],["Current stage",d.status==="Pending"?`${d.stage} review`:"Decided"],["Balance before",d.balanceBefore],["Balance after approval",d.balanceAfter]]}/>
    <ApprovalProgress steps={d.progress}/>
    <h3>Approval history</h3>
    <ApprovalTimeline steps={d.history} acknowledged={d.acknowledged}/>
    {role==="Employee" && <RecoveryActions status={d.status} kind="leave request"/>}
  </>; }
  if (type==="request-detail") { const d=data||REQUESTS[0]; return <>
    <div className="request-summary"><Avatar initials={d.initials}/><div><h3>{d.employee}</h3><p>{d.type}</p></div><Status>{d.status}</Status></div>
    <div className="detail-flags">
      {d.team && <span className="detail-flag">{d.team}{d.teamCode?` · ${d.teamCode}`:""}</span>}
      <span className="detail-flag info">{d.approvalChain}</span>
      {!!d.attachments && <span className="detail-flag info"><FileText size={12}/>{d.attachments} attachment{d.attachments>1?"s":""}</span>}
    </div>
    <Info rows={[["Summary",d.summary],...d.answers,["Submitted",d.submitted],["Manager",d.manager],["Current stage",d.status==="Pending"?`${d.stage} review`:"Decided"]]}/>
    <ApprovalProgress steps={d.progress}/>
    <h3>Approval history</h3>
    <ApprovalTimeline steps={d.history} acknowledged={d.acknowledged}/>
    {role==="Employee" && <RecoveryActions status={d.status} kind="request"/>}
  </>; }
  if (type==="leave-type") return <div className="form-grid"><Field label="Leave type name" required/><Field label="Allowance" required><input type="number"/></Field><Field label="Unit" required><Select><option>Days</option><option>Hours</option></Select></Field><Field label="Paid leave"><Select><option>Yes</option><option>No</option></Select></Field><Field label="Minimum duration"><input type="number"/></Field><Field label="Maximum duration"><input type="number"/></Field><Field label="Eligibility"><Select><option>All employees</option><option>After probation</option></Select></Field><Field label="Carry over"><Select><option>Not allowed</option><option>Allowed</option></Select></Field><Field label="Description" full><textarea/></Field></div>;
  if (type==="request-type") return <><div className="form-grid"><Field label="Request type name" required/><Field label="Description" full><textarea/></Field></div><div className="subsection"><h3>Form fields</h3><div className="mini-row">Reason <Status>Required</Status><IconButton icon={MoreHorizontal} label="More"/></div><Button kind="secondary" icon={Plus}>Add Field</Button></div><div className="subsection"><h3>Approval stages</h3><div className="mini-row">1. Team lead approval <IconButton icon={MoreHorizontal} label="More"/></div><Button kind="secondary" icon={Plus}>Add Stage</Button></div></>;
  if (type==="announcement") return <div className="form-grid"><Field label="Title" required full><input placeholder="e.g. Public holiday on Monday"/></Field><Field label="Audience" required><Select><option>All employees</option><option>Specific department</option><option>Specific team</option></Select></Field><Field label="Pin to top"><Select><option>No</option><option>Yes</option></Select></Field><Field label="Message" required full><textarea placeholder="Write the announcement…"/></Field></div>;
  if (type==="feedback-cycle") return <div className="form-grid"><Field label="Cycle name" required/><Field label="Feedback form" required><Select><option>Performance Review</option><option>Probation Review</option></Select></Field><Field label="Start date" required><input type="date"/></Field><Field label="End date" required><input type="date"/></Field><Field label="Audience" required><Select><option>All employees</option><option>Selected teams</option></Select></Field><Field label="Reviewers"><Select><option>Manager and self</option><option>360 feedback</option></Select></Field><Field label="Allow negative ratings"><Select><option>No</option><option>Yes</option></Select></Field><Field label="Lock responses after end date"><Select><option>Yes</option><option>No</option></Select></Field></div>;
  if (type==="role") return <><div className="form-grid"><Field label="Role name" required/><Field label="Description" full><textarea/></Field></div><h3>Permissions</h3><SearchBox placeholder="Search 44 permissions"/><div className="permission-list">{["Employees","Leave management","Employee Services requests","Salary & bank","Assets","Reports","Configuration","Platform"].map((x,i)=><label key={x}><input type="checkbox" defaultChecked={i<5}/><span><strong>{x}</strong><small>{i%2?"View and manage":"View, create, edit and delete"}</small></span></label>)}</div></>;
  if (type==="feedback-form") return <div className="form-grid"><Field label="Form name" required/><Field label="Description" full><textarea/></Field></div>;
  if (type==="super-admin") return <><Field label="Select user" required><Select><option>Sneha Gupta</option><option>Erwin Llanera</option></Select></Field><div className="warning-box"><AlertTriangle size={19}/><p>This gives unrestricted access to all employee data, settings and platform controls.</p></div></>;
  if (type==="team-delete") return <div className="warning-box"><AlertTriangle size={20}/><p>Delete “UX/UI Team”? Members will be unassigned but not deleted.</p></div>;
  if (type==="delete") return <><div className="warning-box"><AlertTriangle size={20}/><p><strong>Delete Matilda Ipeh Anashie permanently?</strong> This removes the employee profile and cannot be undone.</p></div><Info rows={[["Affected records","3 leave requests · 2 payslips · 4 documents"],["Team impact","Employee will be removed from BLK-UXI"],["Account access","Sign-in access will be revoked"],["Audit trail","A deletion record will be retained"]]}/></>;
  if (type==="terminate") return <><div className="warning-box"><AlertTriangle size={20}/><p><strong>End Matilda Ipeh Anashie’s employment?</strong> Their HR history remains available.</p></div><div className="form-grid"><Field label="Last working day" required><input type="date"/></Field><Field label="Reason" required><Select><option value="">Select a reason</option><option>Resignation</option><option>Termination</option><option>Redundancy</option></Select></Field><Field label="Access end" full><Select><option>At end of last working day</option><option>Immediately</option></Select></Field></div></>;
  if (type==="remove-admin") return <><div className="warning-box"><AlertTriangle size={20}/><p><strong>Remove Super Admin access?</strong> The user keeps their employee account but loses all administration permissions.</p></div><Info rows={[["User","Sneha Gupta"],["Current role","Super Admin"],["New role","Employee"],["Effect","Active sessions will be signed out"]]}/></>;
  return <div className="warning-box"><AlertTriangle size={20}/><p>This action may affect employee records and cannot always be undone. Review the target carefully before continuing.</p></div>;
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
  const key = LOGIN_CONTENT[roleKey] ? roleKey : "admin";
  const content = LOGIN_CONTENT[key];
  const signIn = () => { setRole(content.role); announce(`Signed in as ${content.role}`); go(roleHome(content.role)); };
  return <div className="login-screen">
    <LogoDefs/>
    <label className="login-lang"><Globe2 size={14}/><select aria-label="Language" onChange={e=>announce(`Language changed to ${e.target.value}`)}><option>English</option><option>한국어</option></select><ChevronDown size={12}/></label>
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
        <h2>Sign in</h2>
        <p>Use your MUST account to continue.</p>
        <button className="google-btn" onClick={signIn}><GoogleMark/>Continue with Google</button>
        <p className="login-lock"><LockKeyhole size={13}/>Only <b>@must.company</b> accounts.</p>
        <p className="login-help">Trouble signing in? <a href="#" onClick={e=>{e.preventDefault();announce("Message sent to your people team");}}>Talk to your people team.</a></p>
        <div className="login-tagline"><span>CHALLENGE</span><span>TOGETHER</span><span>ACHIEVE</span></div>
        <div className="login-preview-switch-wrap"><small>Prototype preview</small><div className="login-preview-switch">{LOGIN_TABS.map(([k,label])=><button key={k} className={k===key?"active":""} onClick={()=>go(`/login/${k}`)}>{label}</button>)}</div></div>
      </div>
    </div>
  </div>;
}

export function App() {
  const [path,go]=useRoute(); const [modal,setModal]=useState(null); const [modalData,setModalData]=useState(null); const [role,setRole]=useState(()=>window.localStorage.getItem("hris-preview-role")||"Super Admin");
  const openModal=(type,rowData)=>{setModal(type);setModalData(rowData||null)};
  const closeModal=()=>{setModal(null);setModalData(null)};
  useEffect(()=>{ if(path==="/") go("/dashboard") },[]);
  useEffect(()=>{window.localStorage.setItem("hris-preview-role",role);if((role==="Employee"||role==="Team Lead")&&path==="/dashboard")go("/my-dashboard")},[role,path]);
  if(path.startsWith("/login")) return <LoginScreen roleKey={path.split("/")[2]} go={go} setRole={setRole}/>;
  const isMySpace=["/my-dashboard","/my-profile","/my-salary","/my-documents","/my-team","/my-feedbacks","/my-leaves","/requests","/approvals","/sops","/decision-history"].includes(path);
  const isPreviewRole = role==="Team Lead"||role==="Employee";
  const isAdministration=path.startsWith("/settings")||path==="/activity-logs"||path==="/feedback-form-builder";
  const isManagement=!isMySpace&&!isAdministration;
  const capabilities=roleCapabilities[role];
  const denied=(!capabilities.approvals&&(path==="/approvals"||path==="/decision-history"))||(!capabilities.myTeam&&path==="/my-team")||(!capabilities.managePeople&&isManagement)||(!capabilities.administer&&isAdministration)||(role!=="Super Admin"&&path==="/settings/platform");
  let page;
  if(denied) page=<PermissionDenied go={go}/>;
  else if(isMySpace) { const myProfileTabPaths=["/my-profile","/my-salary","/my-documents","/my-feedbacks"]; const myRequestsTabPaths=["/my-leaves","/requests","/approvals"]; const spaceTabs=isPreviewRole?null:myProfileTabPaths.includes(path)?MY_PROFILE_TABS:myRequestsTabPaths.includes(path)?myRequestsTabs(role):null; page=<>{spaceTabs&&<SectionTabs tabs={spaceTabs} path={path} go={go}/>}<MySpacePage path={path} go={go} role={role} open={openModal}/></>; }
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
  else page=<><PageTitle eyebrow="Not Found" title="Page not found" subtitle="This Admin page does not exist."/><Empty action={<Button onClick={()=>go("/dashboard")}>Go to dashboard</Button>}/></>;
  const isDecision=modal&&["delete","team-delete","terminate","remove-admin"].includes(modal);
  const isDetail=modal&&["leave-detail","request-detail"].includes(modal);
  const onSave=modal==="apply-leave"?()=>announce("Leave request submitted for approval"):modal==="new-request"?()=>announce("Request submitted for approval"):undefined;
  return <Shell path={path} go={go} role={role} setRole={setRole} open={openModal} isMySpace={isMySpace}>{page}{modal&&<Modal title={modalNames[modal]} subtitle={modal==="leave"?"This Admin action bypasses standard employee leave validation.":undefined} onClose={closeModal} onSave={onSave} wide={["employee","asset","request-type","role","apply-leave","new-request"].includes(modal)} footer={isDetail?<DetailFooter data={modalData} role={role} onClose={closeModal}/>:isDecision?<><Button kind="secondary" onClick={closeModal}>Cancel</Button><Button kind={modal==="team-delete"?"primary":"danger"} icon={Trash2} onClick={()=>{announce("Action completed and recorded in Activity Logs");closeModal()}}>{modal==="team-delete"?"Delete Team":"Confirm action"}</Button></>:undefined}><ModalContent type={modal} data={modalData} role={role}/></Modal>}</Shell>;
}
