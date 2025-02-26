"use client";

import Container from "@/components/Container/Container";
import Image from "@/components/Image/Image";
import Text from "@/components/Text/Text";
import { useAuthStore } from "@/store/globalStore";

const UserInfo = ({ children }) => {
  const { user } = useAuthStore();
  return (
    <Container
      colorVariant={"secondary"}
      customClasses={`user-info-container-base`}
    >
      <div className="flex items-center px-4 sm:px-6">
        <div className="flex-shrink-0">
          <Image
            height={40}
            width={40}
            alt={`${user.fullName} profile picture`}
            src={user.avatarUrl}
            className="h-10 w-10 rounded-full"
          />
        </div>
        <div className="ml-3">
          <Text colorType={"user-name"} customClasses={`user-name-base`}>
            {user.fullName}
          </Text>
          <Text colorType={"user-email"} customClasses={`user-email-base`}>
            {user.email}
          </Text>
        </div>
      </div>
      {children}
    </Container>
  );
};

export default UserInfo;
