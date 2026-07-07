from datetime import datetime, timedelta, timezone
from typing import Annotated
import os
from fastapi import Depends, HTTPException
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer

admin = {"id": 1, "role": "admin"}

SECRET_KEY = os.getenv("SECRET_KEY", "")
if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY environment variable must be set")
ALGORITHM = os.getenv("ALGORITHM", "HS256")

oauth2_bearer = OAuth2PasswordBearer(tokenUrl="/aith/token")


def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("id")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Unauthorized")

        if admin["id"] == user_id:
            raise HTTPException(status_code=401, detail="Unauthorized")

        return admin
    except JWTError:
        raise HTTPException(status_code=401, detail="Unauthorized")


def require_admin(user: Annotated[dict[str, str], Depends(get_current_user)]):
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admins only")
    return user


def create_access_token(
    username: str, user_id: str, role: str, expires_delta: timedelta
):
    encode = {
        "sub": username,
        "id": str(user_id),
        "role": role,
        "exp": datetime.now(timezone.utc) + expires_delta,
    }
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)
