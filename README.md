# DevOps Resume Portfolio — OpenShift Project

Responsive single-page personal portfolio with tabs for Home, About, Experience, Skills, Projects, Education, Languages, Personal Details, and Contact. Includes browser Print / Save as PDF. No backend, database, or secrets required.

## Customize first
Edit `index.html` with your verified work experience, education, contact information, languages, and project status. Placeholder statements are deliberately labeled. Do not publish personal contact details you do not want public. The PDF button uses the browser's Print / Save as PDF dialog.

## Run locally (from this directory)
```bash
docker build -t devops-resume:v1 .
docker run --rm -p 8080:8080 devops-resume:v1
```
Open http://localhost:8080 and test http://localhost:8080/healthz.

## Push to Quay
1. Create a public repository `devops-resume` under Quay namespace `arunmdevops` (or adjust the image name in commands and YAML).
2. Log in using your Quay username and robot account/token credentials (never commit credentials).
```bash
docker login quay.io
docker tag devops-resume:v1 quay.io/arunmdevops/devops-resume:v1
docker push quay.io/arunmdevops/devops-resume:v1
```

## Deploy to OpenShift
Log in with `oc login` first, then:
```bash
oc project arunmdevops-dev
oc apply -f k8s/openshift.yaml
oc rollout status deployment/devops-resume
oc get pods,svc,route -l app=devops-resume
oc get route devops-resume -o jsonpath='{.spec.host}{"\n"}'
```
Open `https://` followed by the route hostname. The Route is edge-TLS terminated.

**Note:** `oc get route devops-resume` also works if the label selector returns no route; the provided Route has no `app` label.

If Quay is private, create an OpenShift image pull secret and attach it to the workload service account. OpenShift security policies may differ across clusters; this image uses port 8080 and a non-root base image suitable for restricted environments.

## Troubleshooting
```bash
oc get pods
oc describe pod -l app=devops-resume
oc logs deployment/devops-resume
oc get route devops-resume
```

## Architecture
Browser → OpenShift HTTPS Route → Service:8080 → Pod (unprivileged Nginx) → static HTML/CSS/JS.

## Next improvements
GitHub Actions or Tekton CI/CD, Helm chart, automated smoke tests, and OpenShift rollout on version updates. Use immutable version tags for releases rather than relying on `latest`.
