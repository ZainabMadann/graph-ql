import van from "vanjs-core";

const { div , p  , span , br } = van.tags

export function AuditRatioView(el : HTMLDivElement) :HTMLDivElement{
    return div({ id: 'RatioDiv' },
        div({id:'title-ratio'},
            p("Audits ratio"),
            span({ id: 'ratio-span' }, "1.1"),
        ),
        el
    )  
}
  // const userInfoDiv = div({id:'userInfo'},"level : 39",br(),"last project is rtf")

export function UserInfoView() :HTMLDivElement{
    return div(
        {id:'userInfo'},
        "level : 39",
        br()
        ,"last project is rtf"
    )
}

export function AduitsResultsView():HTMLDivElement{
        return div({id:'AduitsResultsDiv'},
            "rtf : PASS",
            br(),
            "fourm : PASS",
            br(),
            "net-cat : FAIL")
    
}