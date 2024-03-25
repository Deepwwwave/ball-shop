import React from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
   return (
      <main className={styles.homeContainer}>
        <h3>Le Mohaire</h3>
         <p>Découvrez la magie du mohair, une fibre naturelle d'excellence cultivée au cœur de notre ferme en Vendée, en France !</p>

         <img className={styles.homePelotesImg} src="images/pelotes.jpg" alt="pelotes" />
         <p>
            Fibre naturelle d’excellence, le mohair a de multiples qualités qui ne pourront que plaire à ceux qui le découvriront. Son pouvoir d’isolant thermique en toutes saisons, sa grande douceur et sa légèreté donne cette sensation unique de ne rien avoir sur le corps tout en ayant chaud ! Grâce au travail des éleveurs (sélection des animaux, tri à la tonte, etc..) toute trace de « jarre » (poil épais et piquant) a été éliminée pour que le mohair soit parfaitement doux. Chaque toison est examinée et analysée pour déterminer sa finesse et choisir ainsi sa destination de transformation (chaussettes, fils à tricoter, couvertures et plaids, pulls, écharpes, gants…). Possédant un lustre naturel, la fibre réagit très bien à la teinture, les couleurs sont sublimées et offrent aux yeux une luminosité rayonnante. La résistance reconnue de la fibre permet aux produits de rester, moelleux et gonflants au fil du temps. Ils s’entretiennent très facilement, le lavage machine en programme laine
            préservera toutes ses qualités de douceur. Derniers détails, cette fibre naturelle ne s’enflamme pas, ne se froisse pas et ne conserve que très peu les odeurs. Douceur, chaleur, légèreté, brillance, résistance, facilité d’entretien… on se demande encore comment certains font pour résister.
         </p>
      </main>
   );
}
