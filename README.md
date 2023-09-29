# Challenge-code-jobs

[A full stack project that connects enterprise and job seeker]

(https://dbdiagram.io/d/64fc6e2902bd1c4a5e41bac2)

voici un schema UML de la base de donnée

![image](https://github.com/Staneo644/Challenge-code-jobs/assets/81022670/613dd75e-345a-4d93-b360-c89fa99f1d47)


(https://github.com/Staneo644/Challenge-code-jobs/assets/81022670/2ee6b6e9-4ed6-4486-a8f2-7c66dae0f64a)

Pour lancer le site, il faut avoir docker sur son système, puis lancer la commande "make" et ensuite aller sur "http://localhost:8080", si vous voulez lancer des requettes dans le back, c'est sur "http://localhost:3000", puis si vous souhaitez voire la base de donnée à partir d'adminer, c'est sur "http://localhost:3215" (les paramètres se trouvent dans le .env à la racine).

![image](https://github.com/Staneo644/Challenge-code-jobs/assets/81022670/040c4939-5fcf-473a-8a0c-e1c62296e2c0)


Sur ce site, j'ai utilisé l'architecture hexagonale, comme montrée sur cette image et précisé sur ce site : "https://cdiese.fr/larchitecture-hexagonale-en-5-min/", cela signigie que j'ai séparé chacun des modules de mon back en trois "parties" une partie "controller" qui communique avec le front, une partie "service" qui communique en CRUD avec la DB, et une partie "domaine" qui est la partie métier, qui va faire les calculs. L'intérêt de cette architecture est tout d'abord dans le fait que en travaillant dés le début sur le domaine, on met au clair directement le fonctionnement de l'application, ça évite de tout changer d'un coup, ensuite ça permet de changer les ports plus facilement, ainsi, si je change de base de donnée, j'aurais principallement les services à modifier, enfin, ça apporte de la clarté au code et ça permet  de débuguer plus facilement. Voici un exemple:


![image](https://github.com/Staneo644/Challenge-code-jobs/assets/81022670/b6fc7b43-29d5-4e7d-bb84-6601a4a1aa66)


Le controlleur intercepte la demande, la parse si nécessaire, et l'envoie au domaine.

![image](https://github.com/Staneo644/Challenge-code-jobs/assets/81022670/082323b5-50b7-4686-b183-7f220c15ccbb)

Le domaine vérifie si la demande fausse ou non et appelle le service.

![image](https://github.com/Staneo644/Challenge-code-jobs/assets/81022670/c49c15b6-8760-4683-86a4-d694746185e3)

Le service demande à la base de donnée de détruire l'instance, puis renvoit la réponse.




