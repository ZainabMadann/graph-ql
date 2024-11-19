import van from "vanjs-core";
import { renderAuditsResultsView, renderBestSkillsChart, renderProgressChart, renderRatioChart, renderUserInfo } from "./chartsview";
import {  AuditRatioView, UserInfoView } from "./auditsview";

const { div , p , span , br } = van.tags

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
  div(span({id:"welcome-msg"},)),
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

