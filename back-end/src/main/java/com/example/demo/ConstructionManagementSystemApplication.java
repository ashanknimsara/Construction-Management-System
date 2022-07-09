package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ConstructionManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConstructionManagementSystemApplication.class, args);
	}
	//to create user
	@PostConstruct
	protected void init() {
	       List<Authority> authorityList = new ArrayList<>();
	       authorityList.add(createAuthority("USER", "User role"));
	       authorityList.add(createAuthority("ADMIN", "Admin role"));

	       User user = new User();
	       user.setPassword(passwordEncoder.encode("chamath123"));
	       user.setUserName("Chamath");
	       user.setFirstName("ch");
	       user.setLastName("j");
	       user.setEnabled(true);
	       user.setAuthorities(authorityList);
	       userDetailsRepository.save(user);

        }

	private Authority createAuthority(String roleCode, String roleDescription) {
	       Authority authority = new Authority();
	       authority.setRoleCode(roleCode);
	       authority.setRoleDescription(roleDescription);
	       return authority;

	}

}
