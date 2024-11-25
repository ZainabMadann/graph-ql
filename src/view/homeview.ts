import van from "vanjs-core";
import { renderAuditsResultsView, renderBestSkillsChart, renderProgressChart, renderRatioChart, renderUserInfo } from "./chartsview";
import {  AuditRatioView, UserInfoView } from "./auditsview";
import { logoutHandler } from "../logout";

const { div , span  , button} = van.tags

export function showHomePage() {
  document.body.innerHTML = ''

  document.body.appendChild(homeview())
}

function homeview(): HTMLDivElement {
  const chartDiv = div({ id: 'chartDiv'})
  const progressDiv = div({ id: 'progressDiv'})
  const bestSkillsDiv = div({id:'bestSkillsDiv'})
  const auditsDiv = div({ id: 'auditsDiv' })

  const homediv = div({ id: 'home-container' },
  div({id:"upperdiv"},span({id:"welcome-msg"},) ,button({id:'logoutbtn',onclick:logoutHandler},"Logout")),
    div({id:'graphs-container'},
      div({id:'left-container'},
          div({id:'upper-leftDiv'},
            div({id:'left-left'},
              AuditRatioView(chartDiv),
              UserInfoView()
            ),
            bestSkillsDiv
          ),
          progressDiv,
      ),
      div({id:'right-container'},
          auditsDiv
      ),
    )
  )

  renderUserInfo()
  renderProgressChart(progressDiv)
  renderRatioChart(chartDiv)
  renderBestSkillsChart(bestSkillsDiv)
  renderAuditsResultsView(auditsDiv)
  return homediv
}

