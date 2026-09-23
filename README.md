# 모임초대

학교 내 소모임 행사 초대장을 QR로 전달하고 참석 여부를 관리하는 서비스.

## 구조

- `frontend/user_pwa` — 참가자용 PWA (메인 · 개인 초대장 · 응답 완료 · 이용 안내)
- `frontend/admin_web` — 관리자용 웹 (현황판)
- `backend` — REST API 서버 (Express + TypeScript, 목업 데이터)

## 실행

각 폴더에서 개별적으로 의존성을 설치하고 실행합니다.

```
cd backend && npm install && npm run dev              # http://localhost:4000
cd frontend/user_pwa && npm install && npm run dev     # http://localhost:5173
cd frontend/admin_web && npm install && npm run dev    # http://localhost:5174
```
