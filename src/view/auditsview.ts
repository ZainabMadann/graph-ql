import van from "vanjs-core";
interface Audit {
    ProjectName: string
    Result:String
    ExpiresIn: string
}
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

export function AduitsResultsView(audits: Audit[]):HTMLDivElement[] {
    return audits.map((audit) =>
            div(
                { id: "projectDiv" },
                span({ id: 'projectName' }, audit.ProjectName),
                span({ id: 'result' }, audit.Result.toString()),
                span({ id: 'ExpiresIn' }, audit.ExpiresIn)
            )
        )
    
}