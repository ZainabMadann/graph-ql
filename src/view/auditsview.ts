import van from "vanjs-core";

const { div , p  , span , br } = van.tags

export function AuditRatioView(el : HTMLDivElement) :HTMLDivElement{
    return div({ id: 'RatioDiv' },
        div({id:'title-ratio'},
            p("Audits ratio"),
            span({ id: 'ratio-span' }),
        ),
        el
    )  
}
  // const userInfoDiv = div({id:'userInfo'},"level : 39",br(),"last project is rtf")

export function UserInfoView() :HTMLDivElement{
    return div(
        {id:'userInfo'},
        "Your Current Level is ", span({id:'levelspan'}),
        br()
        ,"Your Last Project  is ", span({id:'lastprojectspan'}),
        br()
        ,"Your Last Audit ", span({id:'lastAuditspan'}),
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