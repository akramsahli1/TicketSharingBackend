
const Ticket = require("../models/ticketModel");
const Rapport = require("../models/rapportInterModel");
const Affecter = require("../models/affecterModel");



const stasticAllTicket = async (req, res) => {
  try{
    console.log(req.body)
   let findArgs = {};
  var year=0;

  for (let key in req.body) {
    if (key==='year'){
      
      year=req.body[key]   
    }else if(key==='IDintervenant'){
      if(req.ticket!==undefined){findArgs['_id'] = req.ticket;}
    }
    else{
      if(req.body[key].length>0)
      findArgs[key] = req.body[key];
    }      
  }
  
  var labels=[]
  var values=[]
  var tabTickets={}

  var some=0

  if (year==0){
    const first = await Ticket.findOne().select('dateCreation').sort({dateCreation:1})
    const last = await Ticket.findOne().select('dateCreation').sort({dateCreation:-1})
    
    for(var i=first.dateCreation.getFullYear();i<=last.dateCreation.getFullYear();i++){
      let nbr = await Ticket.count(  {...findArgs, dateCreation: {$gte: new Date(i, 0, 1), $lt: new Date(i+1, 0, 1)}})
      some+=nbr;
      labels.push(i)
      values.push(nbr)
    }  
  }else{
    for(var i=0;i<=11;i++){
      
      let nbr = await Ticket.count(  {...findArgs, dateCreation: {$gte: new Date(year, i, 1), $lt: new Date(year, i+1)}})
      some+=nbr;
      values.push(nbr)
    }
    labels=['Jan','Fev','Mar','Avr','Mai','Juin','Juil','Aôu','Sep','Oct','Nov','Dec']
  }
  tabTickets[`labels`]=labels
  tabTickets[`values`]=values
  tabTickets[`somme`]=some
  
  

    
     console.log(findArgs) 
    res.status(200).json({
        success: "True",
        data : tabTickets
        }); 
    
  } catch(err){
        res.status(404).json({
          success: "false",
        msg:err
      })
  }
};

const stasticTicketPie = async (req, res) => {
  try{
   let findArgs = {};
  var year=0;
 console.log(req.body)
  for (let key in req.body.filtres) {
    if (key==='year'){
      year=req.body.filtres[key]  } 
    else{
      findArgs[key] = req.body.filtres[key];
    }      
  }
  var labels=[]
  var values=[]
  var tabTickets={}
  var pers=[]
  var some=0

 
if(req.body.role==='cl'){
  if (year>0)findArgs['dateCreation']={$gte: new Date(year, 0, 1), $lt: new Date(year+1, 0, 1)};

  pers= await Ticket.find().distinct('IDclient')
  for (var i=0;i<pers.length;i++){
    let val = await Ticket.find(  {...findArgs, IDclient:pers[i]}).populate('IDclient',['raisonSociale'])
    some+=val.length;
    labels.push(val[0].IDclient.raisonSociale)
    values.push(val.length)
   } 
}else{
  if (year>0) findArgs['dateAffectation']={$gte: new Date(year, 0, 1), $lt: new Date(year+1, 0, 1)};
  pers= await Affecter.find({annule:false}).distinct('IDintervenant')
  for (var i=0;i<pers.length;i++){
    var val = await Affecter.find(  {...findArgs, IDintervenant:pers[i] ,annule:false}).populate('IDintervenant',['nom','prenom'])
    labels.push(val[0].IDintervenant.nom+' '+val[0].IDintervenant.prenom)
    if(req.body.etat==='Clôturée'){
      const idsTickes=val.map((aff)=>(aff.IDTicket))
      val = await Ticket.find(  {_id:idsTickes,etat:'Clôturée'});
      console.log('yes')
    }  
    some+=val.length;
    values.push(val.length)
   } 
}


  tabTickets[`labels`]=labels
  tabTickets[`values`]=values
  tabTickets[`somme`]=some 
     console.log(findArgs) 
    res.status(200).json({
        success: "True",
        data : tabTickets
        }); 
    
  } catch(err){
        res.status(404).json({
          success: "false",
        msg:err
      })
  }
};

const stasticTempsTickets = async (req, res) => {
  try{

  var tabTickets={}
 for(var i=0;i<req.body.intervenants.length;i++){
   values = await Affecter.find(  {IDintervenant:req.body.intervenants[i],annule:false}).populate("IDTicket",['dateCloture'])
    tabTickets[`${req.body.intervenants[i]} nbre`]=values.length
    var somme=0
    values.map((tic)=>{
      somme+=(tic.IDTicket.dateCloture - tic.dateAffectation)
    })
    somme=somme/(1000*values.length*60*60)
    tabTickets[`${req.body.intervenants[i]} somme`]=somme

  }
    res.status(200).json({
        success: "True",
        data : tabTickets
        }); 
    
  } catch(err){
        res.status(404).json({
          success: "false",
        msg:err
      })
  }
};



function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function addHours (d,h) {
  var n =new Date(d);
  n.setTime(n.getTime() + (h*60*60*1000));
  return n;
}



const createTicket = async (req, res) => {
  const clients = ["606a3b2eb2983a14b0923f24", "606afc0fab630c45d817abbd", "606b4d5014d46b2d98170fc2", "606b4dc514d46b2d98170fc3", "609dcef42b4a813ba45eee9e","60accf9ae6b7b732788b6019"];
  const priorites=['Normal','Urgent','Critique'];
  const natures=['Maintenance','Neauvau besoin','Maintenance','Maintenance','Maintenance','Maintenance','Maintenance'];
  const objets=['email Blocke','serveur en Panne','Pas de résaux','email Blocke',"Problème d'instalation ",'email Blocke','Problème de base données'];
  var tab=[]
  var refs={}
  try{
  for (var i=0;i<=200;i++){
  var day =getRandomInt(31);
  var month =getRandomInt(11)+1;
  var years =getRandomInt(5)+2015;
  if (refs[years]===undefined) refs[years]=0
  else refs[years]=refs[years]+1;
  var hh=getRandomInt(23)+1;
  var mm=getRandomInt(60)+1;
  var ss=getRandomInt(60)+1;
  var IDclient=clients[getRandomInt(clients.length)];
  var priorite=priorites[getRandomInt(priorites.length)];
  var dateCreation= new Date(years,month,day,hh,mm,ss);
  var ref=`Ti-${years}-${refs[years]}`;
  var nature=natures[getRandomInt(natures.length)];
  var index=getRandomInt(objets.length);
  var objet=objets[index]
  var details=`Detaille ${objets[index]} : \n  les datailles sont des probèlems de ${objets[index]} `;
  tab.push({IDclient,dateCreation,ref,nature,priorite,objet,details});
  console.log(tab[tab.length-1])
 }
  Ticket.insertMany(tab);
    res.status(200).json({
      success: "cbon",
      data :tab
    });

   
  } catch(err) {
    console.log(err);
     res.status(404).json({
     success: "false", });
  } 
};

const createAff = async (req, res) => {
  const membres = ["606b441c1b8dce3f4450122f", "60a7dcaedc0f51312cf49472","6088ad56b8e22a5d907433da","60bd2601374959441caab4d5","60bd266d374959441caab4d6"];
  const nbrAff=[1,1,2,1,1,2,3];
  const demandeCloturee=await Ticket.find()
  const contrats ={
                  "606a3b2eb2983a14b0923f24":["60bd3341374959441caab4d8","60bd4b8f374959441caab4db","60bd4bd0374959441caab4dc"],
                  "606afc0fab630c45d817abbd":["60bd33d3374959441caab4d9"],
                  "606b4d5014d46b2d98170fc2":["60bd34b1374959441caab4da"],
                  "606b4dc514d46b2d98170fc3":[],
                  "609dcef42b4a813ba45eee9e":["60bd4c23374959441caab4dd","60bd4c77374959441caab4de","60bd4ca0374959441caab4df"],
                  "60accf9ae6b7b732788b6019":[]
                  }
  var tab=[]
  var tab2=[]
  try{
  demandeCloturee.map((dde,index)=>{
    var date =dde.dateCreation;
     var ob={}
    //if(index %33===0){
    const limit=nbrAff[getRandomInt(nbrAff.length)]
    const dureeTraitement=getRandomInt(40)+2
     var IDintervenant=""
     for (var j=0;j<=limit;j++){
        let dateAffectation =addHours(date,(getRandomInt(8)+1));
        IDintervenant=membres[getRandomInt(membres.length)];
        let annule=j!==limit ;
        tab.push({IDTicket:dde._id,IDintervenant,dateAffectation,dureeTraitement,annule});
        date=dateAffectation;
      }
      var dateCreation=addHours(date,(getRandomInt(4)+1));
      var dateDebut=addHours(dateCreation,(getRandomInt(2)));
      var dateFin=addHours(dateDebut,(getRandomInt(35)+1));
      tab2.push({IDTicket:dde._id,IDintervenant,dateCreation,dateDebut,dateFin,detailinter:'resolution du probléme '+dde.details})

      var dateCloture =addHours(dateFin,(getRandomInt(2)));
      var contrat= contrats[dde.IDclient].length>0?contrats[dde.IDclient][getRandomInt(contrats[dde.IDclient].length)]:''
      
      if (contrat!==''){
         ob={dateCloture,contrat,etat:'Clôturée'}
      }else{
        ob={dateCloture,detailsSuplum:'sans contrat avec prix personaliseé',etat:'Clôturée'}
      }
    // }else{
    //     var dateCloture =addHours(date,(getRandomInt(3)));
    //     ob={dateCloture,etat:'Clôturée'}      
    // }
    Ticket.findByIdAndUpdate(dde._id,ob, { new: true,runValidators: true})
      .then((inter)=>{
        console.log(inter)
      }); 
       console.log(tab)
 })
 
 Affecter.insertMany(tab);
 Rapport.insertMany(tab2);

    res.status(200).json({
      success: "cbon",
      data :tab
    });

   
  } catch(err) {
    console.log(err);
     res.status(404).json({
     success: "false", });
  } 
};

  module.exports = {
    stasticAllTicket,
    createTicket,
    createAff,
    stasticTempsTickets,
    stasticTicketPie
  };
