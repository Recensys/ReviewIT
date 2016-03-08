import {Injectable} from 'angular2/core';
import {Task,Phase} from './task';
import {Field,String,Radio,Checkbox} from './field';

@Injectable()
export class TaskService {

    private _datafields =  [  
        { name: "author", description: "stuff", input:false, datatype:"string" minwidth: "200px" },
        { name: "title",  input:false, datatype:"string" },
        { name: "year", input:false, datatype:"string" },
        { name: "pdf", input:false, datatype:"resource" },
        { name: "abstract", input:false, datatype:"string", mindwith: "200px" },
        { name: "is gsd?",  description: "cool", input:true, datatype:"boolean", trueval: "yes", falseval: "no" }
    ];

    private _references = [
        { 
            id: 1,
            data: [
                { id: 1, name: "author", value: "Paulish, D.J. and Carleton, A.D." },
                { id: 2, name: "title", value: "Case studies of software-process-improvement measurement"},
                { id: 3, name: "year", value: "1994"},
                { id: 4, name: "PDF", value:""},
                { id: 5, name: "abstract", value:"Describes an ongoing research project conducted jointly by Siemens and the Software Engineering Institute. Siemens software-development organizations in Germany and the United States are case-study sites at which we measure the effect of methods to improve the software-development process. To observe and quantify the impact of software-process improvement, we must measure the performance of a software-development organization over time. Comparison of performance across organizations is very difficult, since organizations define measures and collect performance data in different ways. However, we can separately track performance improvement in each organization if it defines measures consistently and develops similar products. We have defined basic measures for performance of a software-development organization. We limited ourselves to a small number of simple measures to reduce the complexity of collecting, analyzing, and maintaining the performance data. Improving the software-development process improves the quality of software products and the overall performance of the software-development organization. However, process is only one of several controllable factors in improving software quality and organization performance. Others include the skills and experience of the people developing the software, the technology used (e.g. CASE tools), product complexity, and environmental characteristics such as schedule pressure and communications." },
                { id: 6, name: "include", value:"" }
            ]
        },
        { 
            id: 2,
            data: [
                { id: 7, name: "author", value: "Kruchten, Philippe" },
                { id: 8, name: "title", value: "Contextualizing agile software development"},
                { id: 9, name: "year", value: "2013"},
                { id: 10, name: "PDF", value:""},
                { id: 11, name: "abstract", value:"This paper presents a contextual model for software-intensive systems development to guide the adoption and adaptation of agile software development practices. This model was found especially useful when the project context departs significantly from the â{\"A}{\'u}agile sweet spotâ{\"A}{\`u}, that is, the ideal conditions in which agile software development practices originated from, and where they are most likely to succeed, â{\"A}{\'u}out of the boxâ{\"A}{\`u}. This is the case for large systems, distributed development environment, safety-critical systems, system requiring a novel architecture, or systems with an unorthodox business model or governance model." },
                { id: 12, name: "include", value:"" }
            ]
        }, 
        { 
            id: 3,
            data: [
                { id: 13, name: "author", value: "Papatheocharous, Efi and Andreou, Andreas S." },
                { id: 14, name: "title", value: "Evidence of Agile Adoption in Software Organizations: An Empirical Survey"},
                { id: 15, name: "year", value: "2013"},
                { id: 16, name: "PDF", value:""},
                { id: 17, name: "abstract", value:"The paper provides an in depth analysis of empirical evidence on the state of practice within the agile domain obtained through a survey conducted in 2012. The context of focus is agile software processes and teams and the particular topics of interest revolve around three axes: (i) communication; (ii) project management; and (iii) quality assurance and validation. The aim of the survey is to deliver the current levels of agile adoption and practices as these are recorded in the responses of professionals in IT services and the software industry. The goal of the survey is to provide evidence-based assessment of the level of agile adoption by software development organizations, in relation to the general profile of the respondents (country of origin, business sectors, roles, etc.) and compared with different types of practices followed, such as agile techniques adopted, team organization and communication techniques, and project management. Particular patterns and trends are identified in the survey connecting the use of the agile paradigm with the aforementioned practices and investigating its relation with the roles of the respondents and the business strategies of their organizations." },
                { id: 18, name: "include", value:"" }
            ]
        }, 
        { 
            id: 4,
            data: [
                { id: 19, name: "author", value: "Ramasubbu, N." },
                { id: 20, name: "title", value: "Governing Software Process Improvementsin Globally Distributed Product Development"},
                { id: 21, name: "year", value: "2014"},
                { id: 22, name: "PDF", value:""},
                { id: 23, name: "abstract", value:"Continuous software process improvement (SPI) practices have been extensively prescribed to improve performance of software projects. However, SPI implementation mechanisms have received little scholarly attention, especially in the context of distributed software product development. We took an action research approach to study the SPI journey of a large multinational enterprise that adopted a distributed product development strategy. We describe the interventions and action research cycles enacted over a period of five years in collaboration with the firm, which resulted in a custom SPI framework that catered to both the social and technical needs of the firm's distributed teams. Institutionalizing the process maturity framework got stalled initially because the SPI initiatives were perceived by product line managers as a mechanism for exercising wider controls by the firm's top management. The implementation mechanism was subsequently altered to co-opt product line managers, which contributed to a wider adoption of the SPI framework. Insights that emerge from our analysis of the firm's SPI journey pertain to the integration of the technical and social views of software development, preserving process diversity through the use of a multi-tiered, non-blueprint approach to SPI, the linkage between key process areas and project control modes, and the role of SPI in aiding organizational learning." },
                { id: 24, name: "include", value:"" }
            ]
        }, 
        { 
            id: 5,
            data: [
                { id: 25, name: "author", value: "Muhammad Faizan and Sami Ulhaq and M.N.A. Khan" },
                { id: 26, name: "title", value: "Implementing software process improvement: an empirical study"},
                { id: 27, name: "year", value: "2002"},
                { id: 28, name: "PDF", value:""},
                { id: 29, name: "abstract", value:"In this paper we present survey data characterizing the implementation of SPI in 85 UK companies. We aim to provide SPI managers with more understanding of the critical success factors of implementing SPI. We present an analysis of the critical implementation factors identified in published case studies. We use a questionnaire to measure the use of these factors in â{\"A}{\`o}typicalâ{\"A}{\^o} software companies. We found that many companies use SPI but the effectiveness of SPI implementation is variable. Many companies inadequately resource SPI and fail to evaluate the impact of SPI. On the other hand, companies show a good appreciation of the human factors associated with implementing SPI." },
                { id: 30, name: "include", value:"" }
            ]
        }, 
        { 
            id: 6,
            data: [
                { id: 31, name: "author", value: "Niazi, Mahmood and Babar, Muhammad Ali and Verner, June M." },
                { id: 32, name: "title", value: "Software Process Improvement Barriers: A Cross-cultural Comparison"},
                { id: 33, name: "year", value: "2010"},
                { id: 34, name: "PDF", value:"https://lms.ctl.cyut.edu.tw/sysdata/65/42265/doc/b1ca789a400a2d64/attach/2693877.pdf"},
                { id: 35, name: "abstract", value:"Context: Software Process Improvement initiatives have been around for many years with the growing globalisation of software development is making them increasingly important. Objective: The objective of this exploratory research is to gain an in-depth understanding of barriers that can undermine SPI, in the context of Global Software Development, from the perspective of software devel- opment practitioners; this will enable SPI managers to better manage SPI initiatives. We intend to discover if the barriers to SPI initiatives in a developed country are different to those in a developing country. Method: In an empirical study, Vietnamese software practitioners’ experiences of SPI barriers are com- pared with barriers identified by Australian practitioners. Face-to-face questionnaire-based survey ses- sions with 23 Vietnamese SPI practitioners were conducted. Our survey included barriers to SPI improvement initiatives identified in previous research. We asked the participants to rank each SPI barrier on a three-point scale (high, medium, low) to determine the importance of each barrier. We then compare our results, with results (identified in previous work), from 34 Australian software development practitio- ners. Results: Weidentify(1)lackofprojectmanagement,(2)lackofresources,(3)lackofsponsorship,(4)inex- perienced staff/lack of knowledge, and (5) lack of SPI awareness as ‘high’ value SPI barriers in Vietnam. The results also reveal similarities and differences between the experiences of Australian and Vietnamese prac- titioners regarding the importance of the SPI barriers identified. While the Australian practitioners were also concerned with (1) lack of SPI awareness, they were even more concerned with (2) organisational pol- itics, and (3) lack of support. Conclusions: Practitioners identify SPI barriers based on previous SPI implementation experience. Their role(s) in their different organisations have helped them to understand the importance of that barrier. Viet- namese software practitioners cited more SPI barriers than their counterparts in Australia. The Vietnamese SPI barriers relate to project management, resources, and sponsorship while the Australian barriers are concerned with organisational politics and lack of support." },
                { id: 36, name: "include", value:"" }
            ]
        }, 
        { 
            id: 7,
            data: [
                { id: 37, name: "author", value: "Korhonen, Kirsi" },
                { id: 38, name: "title", value: "Evaluating the Impact of an Agile Transformation: A Longitudinal Case Study in a Distributed Context"},
                { id: 39, name: "year", value: "2013"},
                { id: 40, name: "PDF", value:""},
                { id: 41, name: "abstract", value:"" },
                { id: 42, name: "include", value:"" }
            ]
        }, 
        { 
            id: 8,
            data: [
                { id: 43, name: "author", value: "Siakas, Kerstin V. and Georgiadou, Elli" },
                { id: 44, name: "title", value: "Empirical Measurement of the Effects of Cultural Diversity on Software Quality Management"},
                { id: 45, name: "year", value: "2002"},
                { id: 46, name: "PDF", value:""},
                { id: 47, name: "abstract", value:"" },
                { id: 48, name: "include", value:"" }
            ]
        }, 
        { 
            id: 9,
            data: [
                { id: 49, name: "author", value: "Ebert, Christof" },
                { id: 50, name: "title", value: "Technical Controlling and Software Process Improvement"},
                { id: 51, name: "year", value: "1999"},
                { id: 52, name: "PDF", value:""},
                { id: 53, name: "abstract", value:"" },
                { id: 54, name: "include", value:"" }
            ]
        } 
    ];

    private _tasks = [
        {
            id: 1,
            state: 2,
            taskfields: [
                { data: this._references[0].data[1], datafield: this._datafields[1] },
                { data: this._references[0].data[2], datafield: this._datafields[2] },
                { data: this._references[0].data[5], datafield: this._datafields[5] }
            ]
        },
        {
            id: 2,
            state: 2,
            taskfields: [
                { data: this._references[1].data[1], datafield: this._datafields[1] },
                { data: this._references[1].data[2], datafield: this._datafields[2] },
                { data: this._references[1].data[5], datafield: this._datafields[5] }
            ]
        },
        {
            id: 3,
            state: 2,
            taskfields: [
                { data: this._references[2].data[1], datafield: this._datafields[1] },
                { data: this._references[2].data[2], datafield: this._datafields[2] },
                { data: this._references[2].data[5], datafield: this._datafields[5] }
            ]
        },
        {
            id: 4,
            state: 1,
            taskfields: [
                { data: this._references[3].data[1], datafield: this._datafields[1] },
                { data: this._references[3].data[2], datafield: this._datafields[2] },
                { data: this._references[3].data[5], datafield: this._datafields[5] }
            ]
        },
        {
            id: 5,
            state: 1,
            taskfields: [
                { data: this._references[4].data[1], datafield: this._datafields[1] },
                { data: this._references[4].data[2], datafield: this._datafields[2] },
                { data: this._references[4].data[5], datafield: this._datafields[5] }
            ]
        },
        {
            id: 6,
            state: 1,
            taskfields: [
                { data: this._references[5].data[1], datafield: this._datafields[1] },
                { data: this._references[5].data[2], datafield: this._datafields[2] },
                { data: this._references[5].data[5], datafield: this._datafields[5] }
            ]
        },
        {
            id: 7,
            state: 1,
            taskfields: [
                { data: this._references[6].data[1], datafield: this._datafields[1] },
                { data: this._references[6].data[2], datafield: this._datafields[2] },
                { data: this._references[6].data[5], datafield: this._datafields[5] }
            ]
        },
        {
            id: 8,
            state: 1,
            taskfields: [
                { data: this._references[7].data[1], datafield: this._datafields[1] },
                { data: this._references[7].data[2], datafield: this._datafields[2] },
                { data: this._references[7].data[5], datafield: this._datafields[5] }
            ]
        },
        {
            id: 9,
            state: 2,
            taskfields: [
                { data: this._references[5].data[1], datafield: this._datafields[1] },
                { data: this._references[5].data[4], datafield: this._datafields[4] },
                { data: this._references[5].data[2], datafield: this._datafields[2] },
                { data: this._references[5].data[5], datafield: this._datafields[5] }
                { data: this._references[5].data[3], datafield: this._datafields[3] }
            ]
        }

    ];

    private _phases = [
        {
            id: 1,
            name: "Stage 1",
            description: "based on the title assess whether the paper is related to global software engineering",
            datafields:  [ this._datafields[1], this._datafields[2], this._datafields[5]  ],
            tasks: [ 
                this._tasks[0],
                this._tasks[1],
                this._tasks[2],
                this._tasks[3],
                this._tasks[4],
                this._tasks[5],
                this._tasks[6],
                this._tasks[7],
            ]
        },
        {
            id: 2,
            name: "Stage 2",
            description: "based on the title and abstract assess whether the paper is related to software process improvement",
            datafields:  [ this._datafields[1], this._datafields[4], this._datafields[2], this._datafields[5], this._datafields[3] ],
            tasks: [ 
                this._tasks[8] 
            ]
        }
    ];

    public getPhases() {
        return this._phases;
    }

    public getTask(id:number){
        return Promise.resolve(this._tasks).then(tasks => tasks.filter(t => t.id == id)[0]) 
    }
}

/*private _task: Task = {
id: 2,
fields:[
{ name: "Title",  type:"string", input:false, value: "ActivitySpace: Managing Device Ecologies in an Activity-Centric Configuration Space"},
{ name: "Author", type:"string", input:true, value: "Steven Houben, Paolo Tell, Jakob E Bardram"},
{ name: "Tag", type:"checkbox", input:true, values: [{key:"one", value:true}, {key:"two", value:false}, {key:"three", value:false}]},
{ name: "Category", type:"radio", input:true, options: ["one","two","three"], selected:"one"},
{ name: "PDF", type:"resource", input:true, value:"http://www.itu.dk/people/bardram/pdf/ITS2014.ActivitySpace.pdf" }
]
}

private _tasks: Task[] = [
{
id: 1,
fields:[
{ name: "Title",  type:"string", input:false, value: "ActivitySpace: Managing Device Ecologies in an Activity-Centric Configuration Space"},
{ name: "Author", type:"string", input:false, value: "Steven Houben, Paolo Tell, Jakob E Bardram"},
{ name: "Tag", type:"checkbox", input:false, values: [{key:"one", value:false}, {key:"two", value:true}, {key:"three", value:false}]},
{ name: "Category", type:"radio", input:false, options: ["one","two","three"], selected:"one"},
{ name: "PDF", type:"resource", input:false, value:"http://www.itu.dk/people/bardram/pdf/ITS2014.ActivitySpace.pdf" }
]
},
this._task,
this._task
];*/
