import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { developerData, profileData } from "./portfolio/data";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: "#111827",
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 44,
    backgroundColor: "#FFFFFF",
  },
  // Header
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 14,
  },
  name: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: "#2563EB",
    marginBottom: 3,
  },
  tagline: {
    fontSize: 10,
    color: "#6B7280",
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  contactItem: {
    fontSize: 8,
    color: "#6B7280",
  },
  contactLink: {
    fontSize: 8,
    color: "#2563EB",
    textDecoration: "none",
  },
  // Section
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 4,
  },
  // Summary
  summaryText: {
    fontSize: 9,
    color: "#374151",
    lineHeight: 1.5,
  },
  // Experience
  expItem: {
    marginBottom: 10,
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  expCompany: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  expPeriod: {
    fontSize: 8,
    color: "#9CA3AF",
  },
  expRole: {
    fontSize: 9,
    color: "#2563EB",
    marginBottom: 3,
  },
  expDesc: {
    fontSize: 8,
    color: "#6B7280",
    lineHeight: 1.5,
    marginBottom: 3,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  tag: {
    fontSize: 7,
    color: "#374151",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },
  // Projects
  projectItem: {
    marginBottom: 8,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  projectName: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  projectTag: {
    fontSize: 7,
    color: "#9CA3AF",
  },
  projectDesc: {
    fontSize: 8,
    color: "#6B7280",
    lineHeight: 1.5,
    marginBottom: 3,
  },
  // Stack
  stackGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  stackCategory: {
    width: "30%",
    marginBottom: 6,
  },
  stackCategoryName: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#374151",
    marginBottom: 3,
  },
  stackItem: {
    fontSize: 8,
    color: "#6B7280",
    marginBottom: 1,
  },
  // Education
  eduItem: {
    marginBottom: 6,
  },
  eduDegree: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  eduSchool: {
    fontSize: 8,
    color: "#6B7280",
  },
});

const featuredProjects = developerData.projects.slice(0, 3);

export default function DevPDFDocument() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{profileData.name}</Text>
          <Text style={styles.tagline}>{developerData.hero.headline}</Text>
          <View style={styles.contactRow}>
            <Link src={`mailto:${profileData.contact.email}`} style={styles.contactLink}>
              {profileData.contact.email}
            </Link>
            <Link src={profileData.contact.linkedin} style={styles.contactLink}>
              LinkedIn
            </Link>
            <Link src={profileData.contact.github} style={styles.contactLink}>
              GitHub
            </Link>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo Profissional</Text>
          <Text style={styles.summaryText}>{developerData.hero.tagline}</Text>
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experiência Profissional</Text>
          {developerData.experience.map((exp, i) => (
            <View key={i} style={styles.expItem}>
              <View style={styles.expHeader}>
                <Text style={styles.expCompany}>{exp.company}</Text>
                <Text style={styles.expPeriod}>{exp.period}</Text>
              </View>
              <Text style={styles.expRole}>{exp.role}</Text>
              <Text style={styles.expDesc}>{exp.description}</Text>
              <View style={styles.tagRow}>
                {exp.tech.map((t) => (
                  <Text key={t} style={styles.tag}>{t}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projetos em Destaque</Text>
          {featuredProjects.map((p, i) => (
            <View key={i} style={styles.projectItem}>
              <View style={styles.projectHeader}>
                <Text style={styles.projectName}>{p.name}</Text>
                {p.tag && <Text style={styles.projectTag}>{p.tag}</Text>}
              </View>
              <Text style={styles.projectDesc}>{p.description}</Text>
              <View style={styles.tagRow}>
                {p.tech.map((t) => (
                  <Text key={t} style={styles.tag}>{t}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Stack */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stack Técnica</Text>
          <View style={styles.stackGrid}>
            {Object.entries(developerData.stack).map(([cat, techs]) => (
              <View key={cat} style={styles.stackCategory}>
                <Text style={styles.stackCategoryName}>{cat}</Text>
                {techs.map((t) => (
                  <Text key={t} style={styles.stackItem}>• {t}</Text>
                ))}
              </View>
            ))}
          </View>
        </View>

        {/* Education placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Formação Acadêmica</Text>
          <View style={styles.eduItem}>
            <Text style={styles.eduDegree}>Bacharelado em Ciência da Computação</Text>
            <Text style={styles.eduSchool}>Universidade Federal — 2014 a 2018</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}